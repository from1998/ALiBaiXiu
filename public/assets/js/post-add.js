// 获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { res: res });
        $('#category').html(html)
    }
})

// 绑定选择文件事件
$('#feature').on('change', function() {
    // 获取文件
    var file = this.files[0];
    // 创建formData对象
    var formData = new FormData();
    // 将文件追加到formData对象中
    formData.append('cover', file);
    // 实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function(response) {
            console.log(response)
                // 将图片地址存储在隐藏域中
            $('#thumbnail').val(response[0].cover);
        }
    })
})

// 添加文章功能
$('#addArticle').on('submit', function() {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    })
    return
})

// 修改文章
// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function(categories) {
                    res.categories = categories;
                    var html = template('modifyTpl', res);
                    $('#parentBox').html(html);
                }
            })
        }
    })
}

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        } 
    }
    return -1;
}

// 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize()
        // 获取管理员正在修改的文章id值
    var id = $(this).attr('data-id');
    $.ajax({
            type: 'put',
            url: '/posts/' + id,
            data: formData,
            success: function() {
                location.href = '/admin/posts.html';
            }
        })
        // 阻止表单默认提交行为
    return false;
});