import { Request, Response } from "express";
import { IBorrow } from "../interface/borrow.interface";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const newBorrowBook: IBorrow = req.body;

    const book = await Book.findById(newBorrowBook.book);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
        error: `No book found with ID: ${newBorrowBook.book}`,
      });
    }

    if (book.copies < newBorrowBook.quantity) {
      return res.status(400).json({
        message: "Not enough copies available",
        success: false,
        error: `Requested quantity ${newBorrowBook.quantity} exceeds available copies ${book.copies}`,
      });
    }

    const borrow = await Borrow.create(newBorrowBook);

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: error,
      });
      return;
    }
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const borrowedBooksSummary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo"
        }
      },
      {
        $unwind: "$bookInfo"
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowedBooksSummary,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error,
    });
  }
};
