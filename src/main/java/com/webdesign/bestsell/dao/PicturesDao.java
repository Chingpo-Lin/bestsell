package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Picture;

import java.util.List;

public interface PicturesDao {
    /**
     * get pictures by given product id
     * @param productId
     * @return
     */
    List<Picture> getPicturesByProductId(int productId);

    /**
     * delete a product's all pictures by product id
     * @param productId
     * @return
     */
    int deletePicturesByProductId(int productId);


    /**
     * delete a picture by picture id
     * @param pictureId
     * @return
     */
    int deletePictureByPictureId(int pictureId);


    int addPicture(Picture picture);
}
