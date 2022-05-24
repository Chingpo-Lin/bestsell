package com.webdesign.bestsell.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class OrderDisplay {

//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd hh:mm:ss", locale="en", timezone = "PST")
    private Date createTime;

    private Integer count;

    private Double price;

    private String img;

    private String name;

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
