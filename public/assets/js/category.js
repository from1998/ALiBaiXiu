$('#addCategory').on('submit', function() {
    var formDate = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formDate,
        success: function() {
            location.reload()
        }
    })
    return
})

// 显示分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoriesTpl', {
            res: res
        })
        $('#categoriesList').html(html)
    }
})

// 分类数据修改
$('#categoriesList').on('click', '.edit', function() {
        var id = $(this).attr('data-id')
        console.log(id);

        $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function(res) {
                var html = template('modifyCategoryTpl', res)
                $('#formBox').html(html)
            }
        })
    })
    // 提交修改的分类数据
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取表单中输入
    var formData = $(this).serialize()
        // 获取要修改的分类数据的id
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload() //修改分类数据成功,重载页面
        }
    })

    return // 阻止表单默认提交行为
})
$('#categoriesList').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗')) {
        // 获取要删除的分类数据id
        var id = $(this).siblings('.edit').attr('data-id')
            // 向服务器端发送请求 删除分类数据
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
});