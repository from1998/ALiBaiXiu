// 绑定选择logo图片事件
$('#logo').on('change', function () {
	// 获取选择到的图片
	var file = this.files[0];
	// 创建formData对象 实现二进制文件上传
	var formData = new FormData();
	// 将选择到的文件添加到formData对象中
	formData.append('logo', file);
	// 向服务器端发送Ajax请求 实现文件上传
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (res) {
			$('#hiddenLogo').val(res[0].logo)
			// 将logo图片显示在页面中
			$('#preview').attr('src', res[0].logo)
		}
	})
});


// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 向服务器端发送请求 实现网站设置数据添加功能
	$.ajax({
		type: 'post',
		url: '/settings',
		data: formData,
		success: function () {
			location.reload();
		}
	})
	// 阻止表单默认提交行为
	return
})

// 向服务器端发送请求 索要网站设置数据
$.ajax({
	type: 'get',
	url: '/settings',
	success: function (res) {
		if (res) {
			// 将logo地址存储在隐藏域中
			$('#hiddenLogo').val(res.logo)
			// 将logo显示在页面中 
			$('#preview').attr('src', res.logo)
			// 将网站标题显示在页面中
			$('input[name="title"]').val(res.title);
			// 将是否开启评论功能显示在页面中
			$('input[name="comment"]').prop('checked', res.comment)
			// 将评论是否经过人工审核显示在页面中
			$('input[name="review"]').prop('checked', res.review)
		}
	}
})