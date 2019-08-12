$('#logout').on('click', function() {
    // confirm()提示框返回布尔值
    var isConfirm = confirm('确定要退出?')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html'
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})