package com.webdesign.bestsell.service.impl;

import com.webdesign.bestsell.dao.CategoryDao;
import com.webdesign.bestsell.dao.PicturesDao;
import com.webdesign.bestsell.dao.ProductDao;
import com.webdesign.bestsell.domain.Picture;
import com.webdesign.bestsell.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PictureServiceImpl implements PictureService {
    @Autowired
    private PicturesDao picturesDao;

    @Override
    public boolean addPicture(int productId, String pictureURL) {

        Picture newPicture = new Picture(UUID.randomUUID().toString(), productId, pictureURL);
        picturesDao.addPicture(newPicture);
        return true;
    }

    @Override
    public boolean deletePicture(int pictureID) {
        picturesDao.deletePictureByPictureId(pictureID);
        return false;
    }

    @Override
    public boolean deleteAllPicturesOfaProduct(int productID) {
        picturesDao.deletePicturesByProductId(productID);
        return false;
    }

    @Override
    public List<Picture> showAProductPictures(int productID) {
        List<Picture> listOfPicture = picturesDao.getPicturesByProductId(productID);
        return listOfPicture;
    }
}
