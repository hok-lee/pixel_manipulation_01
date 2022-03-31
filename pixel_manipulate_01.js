


var image_flare = new Image();
image_flare.src = "./flare_02.png";

image_flare.onload = draw_flare;

draw_gradient();

// draw_img_from_canvas();

function draw_flare(){
    draw_flare_on_canvas();
    draw_flare_on_img_from_canvas();
}

function draw_flare_on_canvas(){

    let w = image_flare.width;
    let h = image_flare.height;


    // var canvas_invisible = document.createElement("canvas");
    // canvas_invisible.width = w;
    // canvas_invisible.height = h;
    // var context_invisible = canvas_invisible.getContext("2d");

    // context_invisible.fillRect(0, 0, w, h);
    // context_invisible.drawImage(image_flare, 0, 0);

    // var image_data_flare = context_invisible.getImageData(0, 0, w, h);




    var canvas_01 = document.getElementById("id_canvas_01");
    canvas_01.width = w;
    canvas_01.height = h;
    var context = canvas_01.getContext("2d");


    context.fillRect(0, 0, w, h);
    context.drawImage(image_flare, 0, 0);

    var image_data_flare = context.getImageData(0, 0, w, h);


    // console.log(`w=${w}, h=${h}, w*h=${w*h}`);
    // console.log(`image_data_flare.data.length/4=${image_data_flare.data.length/4}`);
    
    for (let i=0; i<image_data_flare.data.length; i+=4){
        image_data_flare.data[i] = 255 - image_data_flare.data[i];
        image_data_flare.data[i+1] = 255 - image_data_flare.data[i+1];
        image_data_flare.data[i+2] = 255 - image_data_flare.data[i+2];
        image_data_flare.data[i+3] = 255;
    }


    context.putImageData(image_data_flare, 0, 0);

    context.strokeRect(0, 0, w, h);

}


function draw_flare_on_img_from_canvas(){

    // console.log("Draw img");

    let div_holder_image_01 = document.getElementById("id_div_holder_img_01");
    let canvas = document.getElementById("id_canvas_01");

    let img_from_canvas = new Image();
    img_from_canvas.src = canvas.toDataURL();
    div_holder_image_01.appendChild(img_from_canvas);
}



function draw_gradient(){
    var w = 300;
    var h = 200;

    var canvas_02 = document.getElementById("id_canvas_02");
    canvas_02.width = w;
    canvas_02.height = h;
    var context = canvas_02.getContext("2d");

    context.strokeRect(0, 0, w, h);

    var wg = 100;
    var hg = 200;
    var image_data_gradient = context.createImageData(wg, hg);
    // console.log(image_data_gradient.data.length/4);


    for (let i=0; i<image_data_gradient.data.length; i+=4){
        let index_pixel = i/4;

        let x = index_pixel % wg;
        let y = Math.floor(index_pixel/wg);

        // image_data_gradient.data[i] = 255 * y/hg;
        // image_data_gradient.data[i+1] = 255 * y/hg;
        // image_data_gradient.data[i+2] = 255 * y/hg;
        // image_data_gradient.data[i+3] = 255;

        if (y<hg/2){
            image_data_gradient.data[i] = 255;
            image_data_gradient.data[i+1] = 255 * y/(hg/2);
            image_data_gradient.data[i+2] = 255 * y/(hg/2);
            image_data_gradient.data[i+3] = 255;
        } else {
            image_data_gradient.data[i] = 255 * (2- y/(hg/2));
            image_data_gradient.data[i+1] = 255 * (2- y/(hg/2));
            image_data_gradient.data[i+2] = 255;
            image_data_gradient.data[i+3] = 255;
        }
    }


    context.putImageData(image_data_gradient, 0, 0);
}