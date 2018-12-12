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
    var firstNameSvg = createSVG(backgroundColor, name.slice(-2));
    var firstNameUri = 'data:image/svg+xml,' + encodeURIComponent(firstNameSvg.outerHTML);
    var lastNameSvg = createSVG(backgroundColor, name.slice(0, 1))
    var lastNameUri = 'data:image/svg+xml,' + encodeURIComponent(lastNameSvg.outerHTML);
    var lastImgDiv1 = '<img style="border-radius: 50%" src=' + lastNameUri +  '>'
    var lastImgDiv2 = '<img src=' + lastNameUri +  '>'
    $(".name-div").append(lastImgDiv1);
    $(".name-div").append(lastImgDiv2);
    var firstImgDiv1 = '<img style="border-radius: 50%" src=' + firstNameUri +  '>'
    var firstImgDiv2 = '<img src=' + firstNameUri +  '>'
    $(".name-div").append(firstImgDiv1);
    $(".name-div").append(firstImgDiv2);
  }

  //生成svg
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

})
