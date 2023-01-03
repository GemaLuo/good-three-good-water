//地圖
document.querySelector('a').addEventListener('hover',function(){
    var theID = document.querySelector(this).attr('id');
    document.querySelector('select').val(theID);
    document.querySelector('a').classList.remove('active');
    document.querySelector(this).classList.add('active');
})
  
document.querySelector('#city').addEventListener('change',function(){
    var valID = document.querySelector('#city').value;
    document.querySelector('a').classList.remove('active');
    document.querySelector('#' + valID).classList.add('active');
})
  