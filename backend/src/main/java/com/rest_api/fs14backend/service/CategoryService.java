package com.rest_api.fs14backend.service;

import com.rest_api.fs14backend.entity.Category;
import java.util.List;
import java.util.UUID;

public interface CategoryService {
    public List<Category> findAll();

    public Category updateOne(UUID id,Category updatedCategory);

    public Category addOne(Category newCategory);

    public void deleteOne( UUID categoryId);
    public Category findCategoryById(UUID categoryId);
}
