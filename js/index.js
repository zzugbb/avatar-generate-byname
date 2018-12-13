$(function(){

  var options = {
    // pick type, eg. firstNmae, lastName, initials
    nameType: 'firstName', 
    // font family list
    fontFamily: 'Verdana, Geneva, sans-serif',
    // pick from https://material.io/guidelines/style/color.html#color-color-tool
    backgroundColors: [
      '#F44336', '#E91E63', '#9C27B0',
      '#673AB7', '#3F51B5', '#2196F3',
      '#03A9F4', '#00BCD4', '#009688',
      '#4CAF50', '#8BC34A', '#CDDC39',
      '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#607D8B',
      '#F29F81', '#5BC1EF', '#c289ce',
      '#f4ce5b', '#cccf80', '#27c675'
    ],
    // font color default white
    textColor: '#FFF',
  }

  //点击生成
  $('.create-avatar').click(function(){
    crateImage();
  })


  function crateImage() {
    var index = Math.floor((Math.random()*options.backgroundColors.length));
    var backgroundColor = options.backgroundColors[index];
    var name = $(".name-input").val().toUpperCase();

    var lastNameUriCircle = 'data:image/svg+xml,' + encodeURIComponent(createSVGCircle(backgroundColor, name.slice(0, 1)).outerHTML);
    var lastNameUri = 'data:image/svg+xml,' + encodeURIComponent(createSVG(backgroundColor, name.slice(0, 1)).outerHTML);

    svgToPng(0, createSVGCircle(backgroundColor, name.slice(0, 1)));
    svgToPng(1, createSVG(backgroundColor, name.slice(0, 1)));

    var firstNameUriCircle = 'data:image/svg+xml,' + encodeURIComponent(createSVGCircle(backgroundColor, name.slice(-2)).outerHTML);
    var firstNameUri = 'data:image/svg+xml,' + encodeURIComponent(createSVG(backgroundColor, name.slice(-2)).outerHTML);
    
    svgToPng(2, createSVGCircle(backgroundColor, name.slice(0, -2)));
    svgToPng(3, createSVG(backgroundColor, name.slice(-2)));
 
    var lastImgDivCircle = '<img src=' + lastNameUriCircle +  '>'
    var lastImgDiv = '<img src=' + lastNameUri +  '>'
    $(".name-div").append(lastImgDivCircle);
    $(".name-div").append(lastImgDiv);

    var firstImgDivCircle = '<img src=' + firstNameUriCircle +  '>'
    var firstImgDiv = '<img src=' + firstNameUri +  '>'
    $(".name-div").append(firstImgDivCircle);
    $(".name-div").append(firstImgDiv);

  }

  //生成svg矩形
  function createSVG(color, name){
    var svg = document.createElement('svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  
    svg.setAttribute('width', 50);
    svg.setAttribute('height', 50);

  
    // <rect> background
    var rect = document.createElement('rect')
    rect.setAttribute('fill', color)
    rect.setAttribute('x', 0)
    rect.setAttribute('y', 0)
    rect.setAttribute('width', '100%')
    rect.setAttribute('height', '100%')
  
    svg.appendChild(rect)
  
  
    // <text> name
    var text = document.createElement('text')

    text.setAttribute('fill', options.textColor)
    text.setAttribute('x', '50%')
    text.setAttribute('y', '50%')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', "16")
    text.setAttribute('font-family', options.fontFamily)

    // IE/Edge don't support alignment-baseline
    // @see https://msdn.microsoft.com/en-us/library/gg558060(v=vs.85).aspx
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      text.setAttribute('dy', '0.35em')
    } else {
      text.setAttribute('alignment-baseline', 'middle')
    }

    text.textContent = name

    svg.appendChild(text)
  
    return svg;
  }

  //生成svg圆形
  function createSVGCircle(color, name){
    var svg = document.createElement('svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  
    svg.setAttribute('width', 50);
    svg.setAttribute('height', 50);
    
  
    // <circle> background
    var circle = document.createElement('circle')
    circle.setAttribute('fill', color)
    circle.setAttribute('cx', 25)
    circle.setAttribute('cy', 25)
    circle.setAttribute('r', 25)
  
    svg.appendChild(circle)
  
  
    // <text> name
    var text = document.createElement('text')

    text.setAttribute('fill', options.textColor)
    text.setAttribute('x', '50%')
    text.setAttribute('y', '50%')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', "16")
    text.setAttribute('font-family', options.fontFamily)

    // IE/Edge don't support alignment-baseline
    // @see https://msdn.microsoft.com/en-us/library/gg558060(v=vs.85).aspx
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      text.setAttribute('dy', '0.35em')
    } else {
      text.setAttribute('alignment-baseline', 'middle')
    }

    text.textContent = name

    svg.appendChild(text)
  
    return svg;
  }

  //转化为png下载
  function svgToPng(flag, svg) {
    var img = document.getElementById("canvas-img-" + flag);
    img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg.outerHTML)));
    var canvas = document.getElementById("canvas-" + flag);
    var context = canvas.getContext('2d');
    context.drawImage(img, 15, 15);

    var a = document.getElementById("canvas-a-" + flag);
    a.href = canvas.toDataURL('image/png');
    a.download = "img-" + flag;

    $('.download').unbind();
    $('.download').click(function(){
      document.getElementById("canvas-a-" + $(this).attr('id')).click();
    }) 
  }

})
