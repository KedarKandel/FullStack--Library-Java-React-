package com.rest_api.fs14backend.serviceImpl;

import com.rest_api.fs14backend.entity.Category;
import com.rest_api.fs14backend.repository.CategoryRepository;
import com.rest_api.fs14backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateOne(UUID id,Category updatedCategory) {
        Category foundCategory =  categoryRepository.findById(id).orElse(null);

        if(foundCategory != null){
            foundCategory.setName(updatedCategory.getName());
            return categoryRepository.save(foundCategory);
        }
        return null;
    }

    @Override
    public Category addOne(Category newCategory){
        Category category = new Category();
        category.setName(newCategory.getName());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteOne(UUID categoryId)  {
        categoryRepository.deleteById(categoryId);
    }
    public Category findCategoryById(UUID id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        return categoryOptional.orElse(null);
    }
}
