$('#modifyPwd').on('submit', function() {
    // serialize()获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();

    console.log(formData);

    // 向服务器端发送修改密码的请求
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(res) {
            alert(res.message)
                // 密码修改成功,重定向到登录页面
            location.href = "/admin/login.html"
        },
        error: function() {
            alert('密码修改失败!')
        }
    })
    return // 阻止表单的默认提交行为
})