package com.webdesign.bestsell.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

// product: id, user_id, price, img, description, create_date, stock, name, category_id, review
public class Product {

    private int id;

    private int userId;

    private double price;

    private String img;

    private String description;

    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss", locale="zh", timezone = "GMT+8")
    private Date createDate;

    private int stock;

    private String name;

    private int categoryId;

    public Product(int id, double price, String img, String description, int stock, String name, int categoryId) {
        this.id = id;
        this.price = price;
        this.img = img;
        this.description = description;
        this.stock = stock;
        this.name = name;
        this.categoryId = categoryId;
        this.createDate = new Date();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", userId=" + userId +
                ", price=" + price +
                ", img='" + img + '\'' +
                ", description='" + description + '\'' +
                ", createDate=" + createDate +
                ", stock=" + stock +
                ", name='" + name + '\'' +
                ", categoryId=" + categoryId +
                '}';
    }
}
