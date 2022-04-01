//
//  upload.cc
//
//  Copyright (c) 2019 Yuji Hirose. All rights reserved.
//  MIT License
//

#include <fstream>
#include <httplib.h>
#include <iostream>
using namespace httplib;
using namespace std;

const char *html = R"(
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
    <title>index</title>
</head>

<body>
    <!-- z-index是垂直屏幕放置的位置 -->
    <canvas id='mycanvas' style="
                                position:absolute;
                                z-index:-1;    
                                filter: alpha(50%);"></canvas>
    <script src="js/background.js"></script>

    <form id="formElem">    
        <h2>FPGA推理界面</h2>
        <input type="file" name='image_file' accept="image/*">
        <input type="submit" class="submit"></input>
    </form>
    <script src="js/submitimg.js"></script>
    
</body>

</html>
)";

const char *html2 = R"(
<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <title>page2</title>
  <link rel="stylesheet" href="css/style.css">
  
  <script src="https://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gsap/1.19.1/TweenMax.min.js"></script>

</head>
<img>
<div class="slider-wrap">
  <div class="slider" id="card-slider"></div>
</div>
<script src="js/outcomejson.js"></script>
<div><img src="result/img1.jpg"></img></div>
<canvas id='mycanvas' style="
                                position:absolute;
                                z-index:-1;
                                filter: alpha(50%);"></canvas>
<script src="js/background.js"></script>

</body>

</html>)";
int main(void)
{
    Server svr;

    svr.Get("/", [](const Request & /*req*/, Response &res)
            { res.set_content(html, "text/html"); });

    svr.Post("/post", [](const Request &req, Response &res)
             {
    auto image_file = req.get_file_value("image_file");

    cout << "image file length: " << image_file.content.length() << endl
         << "image file name: " << image_file.filename << endl
         << "text file length: " << text_file.content.length() << endl
         << "text file name: " << text_file.filename << endl;

    {
      ofstream ofs(image_file.filename, ios::binary);
      ofs << image_file.content;
    }

    res.set_content("done", "text/plain"); });

    svr.listen("localhost", 1234);
}