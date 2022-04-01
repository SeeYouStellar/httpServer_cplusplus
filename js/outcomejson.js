/*
 * @Author: xinyu Li
 * @Date: 2022-03-16 18:37:32
 * @LastEditTime: 2022-03-24 12:21:12
 * @Description: 
 * @FilePath: \helloworld\http\js\outcomejson.js
 * chaos is a ladder
 */

async function populatjson() {

  const requestURL = 'result/json1.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const outcome = await response.json();   //获取返回的 json 文件

  rotate(outcome);
}

function ff(obj) {

  const slider_wrap = document.querySelector('.slider-wrap');;//最外层

  const card_slider = document.querySelector('.slider');//第二层

  const xiacis = obj['result'];  //推理出的图片中出现的瑕疵

  for (const xiaci of xiacis) {
    const slider_item = document.createElement("div");
    slider_item.setAttribute("class", "slider-item");

    const animate_card_content = document.createElement("div");
    animate_card_content.setAttribute("class", "animate_card_content");

    const myh4 = document.createElement("h4");
    myh4.setAttribute("class", "animation-card_content_title title-2")
    myh4.textContent = `${xiaci.class_name}`;

    const score = document.createElement("p");
    score.setAttribute("class", "animation-card_content_description p-2")
    score.textContent = `${xiaci.score}`;

    /*快速构建列表
    function list(type) {
      var result = "<" + type + "l><li>";
      var args = Array.prototype.slice.call(arguments, 1);
      result += args.join("</li><li>");
      result += "</li></" + type + "l>"; // end list
      return result;
    }
    var listHTML = list("u", "One", "Two", "Three");
    */
    const mylist = document.createElement('ol');
    const myli2 = document.createElement('li');
    const myli3 = document.createElement('li');
    const myli4 = document.createElement('li');
    const myli5 = document.createElement('li');
    myli2.textContent = `xmin: ${xiaci.xmin}`;
    myli3.textContent = `ymin: ${xiaci.ymin}`;
    myli4.textContent = `xmax: ${xiaci.xmax}`;
    myli5.textContent = `ymax: ${xiaci.ymax}`;
    mylist.appendChild(myli2);
    mylist.appendChild(myli3);
    mylist.appendChild(myli4);
    mylist.appendChild(myli5);

    // const slider_div_img = document.createElement("div");
    // slider_div_img.setAttribute("class", "animation-card_image");
    // const slider_img = document.createElement("img");
    // slider_img.setAttribute("src", "https://uznayvse.ru/images/stories2016/uzn_1460039478.jpg");
    
    // slider_div_img.appendchild(slider_img);
    // slider_item.appendChild(slider_div_img);

    animate_card_content.appendChild(myh4);
    animate_card_content.appendChild(score);
    animate_card_content.appendChild(mylist);

   
    slider_item.appendChild(animate_card_content);
    card_slider.appendChild(slider_item);
  }
  slider_wrap.appendChild(card_slider);

  const img_div = document.createElement("div");
  const img = document.createElement('img')
  img.setAttribute("src", "result/img1.jpg");
  img_div.appendChild(img);

  slider_wrap.appendChild(img_div);
}

async function rotate(obj) {
  await ff(obj);  //等待json文件先读取完数据，并生成标签
  var cards = $('#card-slider .slider-item').toArray();

  startAnim(cards);

  function startAnim(array) {
    if (array.length >= 4) {
      TweenMax.fromTo(array[0], 0.5, { x: 0, y: 0, opacity: 0.75 }, { x: 0, y: -120, opacity: 0, zIndex: 0, delay: 0.03, ease: Cubic.easeInOut, onComplete: sortArray(array) });

      TweenMax.fromTo(array[1], 0.5, { x: 79, y: 125, opacity: 1, zIndex: 1 }, { x: 0, y: 0, opacity: 0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', ease: Cubic.easeInOut });

      TweenMax.to(array[2], 0.5, { bezier: [{ x: 0, y: 250 }, { x: 65, y: 200 }, { x: 79, y: 125 }], boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', zIndex: 1, opacity: 1, ease: Cubic.easeInOut });

      TweenMax.fromTo(array[3], 0.5, { x: 0, y: 400, opacity: 0, zIndex: 0 }, { x: 0, y: 250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut },);
    } else {
      $('#card-slider').append('<p>Sorry, carousel should contain more than 3 slides</p>')
    }
  }

  function sortArray(array) {
    clearTimeout(delay);
    var delay = setTimeout(function () {
      var firstElem = array.shift();
      array.push(firstElem);
      return startAnim(array);
    }, 3000)
  }

}
//入口
populatjson();