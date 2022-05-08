package com.webdesign.bestsell.service;

import com.webdesign.bestsell.domain.Picture;

import java.util.List;

public interface PictureService {
    public boolean addPicture(int productId, String pictureURL);
    public boolean deletePicture(int pictureID);
    public boolean deleteAllPicturesOfaProduct(int productID);
    public List<Picture> showAProductPictures(int productID);
}
