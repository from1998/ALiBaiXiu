// 文章列表展示
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {   
        // 如果返回值res是对象,可以直接使用返回值res拼接模板, 模板里可直接使用res对象的属性
        // 如果返回值res是数组,需要在对象里使用,即{data:res},模板里遍历data
        var html = template('postsTpl', res);
        $('#articleList').html(html);
        var pageHtml = template('pageTpl', res);
        $('#page').html(pageHtml);
    }
})

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 分页功能函数
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(res) {
            var html = template('postsTpl', res);
            $('#articleList').html(html);
            // 再次调用分页模板
            var pageHtml = template('pageTpl', res);
            $('#page').html(pageHtml);
        }
    })
}
// 向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { res: res });
        $('#categoryList').html(html);
    }
})

// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
    var formData = $(this).serialize();
    // 向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            var html = template('postsTpl', res);
            $('#articleList').html(html);
            var pageHtml = template('pageTpl', res);
            $('#page').html(pageHtml);
        }    
    })
    // 阻止表单默认提交行为
    return 
})