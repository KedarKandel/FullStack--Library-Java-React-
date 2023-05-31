package com.rest_api.fs14backend.controller;

import com.rest_api.fs14backend.entity.Category;
import com.rest_api.fs14backend.serviceImpl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("/all")
    public List<Category> findAll(){
        return categoryService.findAll();
    }

    @PutMapping("/update/{id}")
    public Category updateOne(@PathVariable UUID id ,@RequestBody Category updatedCategory) {
        return categoryService.updateOne(id,updatedCategory);
    }

    @PostMapping("/add")
    public Category addOne(@RequestBody Category newCategory) {
        return categoryService.addOne(newCategory);
    }

    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable UUID categoryId) {
        categoryService.deleteOne(categoryId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{categoryId}")
    public Category findById(@PathVariable UUID categoryId) {
        return categoryService.findCategoryById(categoryId);
    }

}