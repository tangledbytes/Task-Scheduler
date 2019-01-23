document.getElementById("pass2").addEventListener('keyup', function(){
    if(document.getElementById("pass1").value == document.getElementById("pass2").value){
        document.querySelector('.message').classList.remove('fail');
        document.querySelector('.alert').classList.add('success');
        document.querySelector('.message').innerHTML = 'Password Match';
        document.querySelector('.login-btn').classList.remove('disable');
        document.querySelector('.login-btn').disabled = false;
    }else{
        document.querySelector('.message').classList.remove('success');
        document.querySelector('.alert').classList.add('fail');
        document.querySelector('.message').innerHTML = 'Password mismatch';
        document.querySelector('.login-btn').classList.add('disable');
        document.querySelector('.login-btn').disabled = true;
    }
});
