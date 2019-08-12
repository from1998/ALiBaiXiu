// 为表单绑定提交事件, 实现添加用户功能
$('#userForm').on('submit', function() {
    // 获取表单值, 并将内容格式化成参数字符串
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload(); //刷新页面
        },
        error: function() {
            alert('用户添加失败!')
        }
    })
    return //阻止表单默认提交行为
})

// 用户头像上传功能
// 使用事件委托, 找到添加用户和修改用户共同的父元素
$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(res) {
            // 预览上传的图片
            $('#preview').attr('src', res[0].avatar)
                // 将图片地址存储在隐藏域中
            $('#hiddenAvatar').val(res[0].avatar)
        }
    })
})

// 获取用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        // 使用,模板字符串拼接
        var html = template('userTpl', { data: res });
        // 插入,将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
})

// 使用事件委托为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html);
        }
    })
})

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取表单值
    var formData = $(this).serialize();
    // 获取要修改的用户的id值
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function() {
            // 用户信息修改成功 重新加载页面
            location.reload()
        }
    })
    return // 阻止表单默认提交行为
})

// 使用事件委托完成删除用户事件
$('#userBox').on('click', '.delete', function() {
    // 使用兄弟元素获取id值
    var id = $(this).siblings('.edit').attr('data-id')
    var isConfirm = confirm('确认删除该用户?')
    if (isConfirm) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                // 删除成功, 重载页面
                location.reload()
            }
        })
    }
})

// 全选用户列表
$('#selectAll').on('change', function() {
    // 获取全选按钮的选中状态
    var status = $(this).prop('checked')
        // 令各个复选框的选中状态与全选按钮保持一致
    $('#userBox').find('input').prop('checked', status)
        // 如果全选按钮被选中,显示批量删除按钮,否则隐藏批量删除按钮
    if (status) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
})

// 反选用户列表
$('#userBox').on('change', '.userStatus', function() {
    // 获取复选框总个数
    var inputs = $('#userBox').find('input')
        // 如果复选框总个数等于选中个数,则全选为选中状态,否则全选不为选中状态
    if (inputs.length == inputs.filter(':checked').length) {
        $('#selectAll').prop('checked', true)
    } else {
        $('#selectAll').prop('checked', false)
    }
    // 如果复选框选中个数大于1,显示批量删除按钮,否则隐藏批量删除按钮
    if (inputs.filter(':checked').length > 1) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
})

// 批量删除
$('#deleteMany').on('click', function() {
    var ids = []
        // 
    var checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'))
    })
    if (confirm('确定要执行批量删除?')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload()
            }
        })
    }
})