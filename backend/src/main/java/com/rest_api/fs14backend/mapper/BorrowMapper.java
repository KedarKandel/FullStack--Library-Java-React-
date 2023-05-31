package com.rest_api.fs14backend.mapper;


import com.rest_api.fs14backend.entity.*;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
public class BorrowMapper {
    public Borrower toBorrow(User user, BookCopy bookCopy, Date borrowDate, Date returnDate, boolean isReturned, Date returnedDate){
        return new Borrower(user,bookCopy,borrowDate,returnDate, isReturned, returnedDate);
    }
}
