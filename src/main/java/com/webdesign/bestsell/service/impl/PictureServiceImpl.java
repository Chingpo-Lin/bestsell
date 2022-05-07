package com.webdesign.bestsell.service.impl;

import com.webdesign.bestsell.domain.Picture;
import com.webdesign.bestsell.service.PictureService;
import java.util.List;

public class PictureServiceImpl implements PictureService {

    @Override
    public boolean addPicture(int productId, String pictureURL) {
        return false;
    }

    @Override
    public boolean deletePicture(int pictureID) {
        return false;
    }

    @Override
    public boolean deleteAllPicturesOfaProduct(int productID) {
        return false;
    }

    @Override
    public List<Picture> showAProductPictures() {
        return null;
    }
}
