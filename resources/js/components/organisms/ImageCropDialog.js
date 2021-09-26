import React, { useState, memo } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../vendor/cropImage";

const aspectRatios = [
    { value: 1 / 1, text: "1/1" },
    // { value: 16 / 9, text: "16/9" },
    // { value: 1 / 2, text: "1/2" },
];

const ImageCropDialog = memo(({
                             id,
                             imageUrl,
                             cropInit,
                             zoomInit,
                             aspectInit,
                             onCancel,
                             setCroppedImageFor,
                             resetImage,
                         }) => {
    if (zoomInit == null) {
        zoomInit = 1;
    }
    if (cropInit == null) {
        cropInit = { x: 0, y: 0 };
    }
    if (aspectInit == null) {
        aspectInit = aspectRatios[0];
    }
    const [zoom, setZoom] = useState(zoomInit);
    const [crop, setCrop] = useState(cropInit);
    const [aspect, setAspect] = useState(aspectInit);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    // const onAspectChange = (e) => {
    //     const value = e.target.value;
    //     const ratio = aspectRatios.find((ratio) => ratio.value == value);
    //     setAspect(ratio);
    // };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
        setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
    };

    const onResetImage = () => {
        resetImage(id);
    };

    return (
        <div>
            <div className="backdrop"></div>
            <div className="crop-container">
                <Cropper
                    image={imageUrl}
                    zoom={zoom}
                    crop={crop}
                    aspect={aspect.value}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className="controls">
                <div className="controls-upper-area">
                    <input type="range"
                           min={1} max={3} step={0.1} value={zoom}
                           onChange={(e)=>{onZoomChange(e.target.value)}}
                           className='slider'
                    />
                    {/*<select value={aspect.value} onChange={onAspectChange}>*/}
                    {/*    {aspectRatios.map((ratio) => (*/}
                    {/*        <option*/}
                    {/*            key={ratio.text}*/}
                    {/*            value={ratio.value}*/}
                    {/*        >*/}
                    {/*            {ratio.text}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                </div>
                <div className="d-flex justify-content-around button-area">
                    <a className="btn btn-primary mr-2" onClick={onCancel}>キャンセル</a>
                    <a className="btn btn-primary mr-2" onClick={onResetImage}>リセット</a>
                    <a className="btn btn-primary" onClick={onCrop}>決定</a>
                </div>
            </div>
        </div>
    );
});

export default ImageCropDialog;
