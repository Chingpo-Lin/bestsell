package com.webdesign.bestsell.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Order {

    private int id;

    private int userId;

    private int productId;

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd hh:mm:ss", locale="en", timezone = "PST")
    private Date createTime;

    private Integer count;

    public Order() {}

    public Order(int userId, int productId) {
        this.userId = userId;
        this.productId = productId;
        createTime = new Date();
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
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

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }


    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", userId=" + userId +
                ", productId=" + productId +
                ", createTime=" + createTime +
                ", count=" + count +
                '}';
    }
}
