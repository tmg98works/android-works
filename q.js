function GetQueryString()
{
    if( 1 < document.location.search.length )
    {     
        var query = document.location.search.substring( 1 );
        var parameters = query.split( '&' );
        var result = new Object();
        for( var i = 0; i < parameters.length; i++ )
        {  
            var element = parameters[ i ].split( '=' );
            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );
            result[ paramName ] = decodeURIComponent( paramValue );
        }
        return result;
    }

    return null;
}


/******
 * バリデートチェック
 * *******/
     $(function() {
			$('.fb_button').attr('disabled', 'disabled');
			
			$('#check').click(function() {
				if ($(this).prop('checked') == false) {
					$('.fb_button').attr('disabled', 'disabled');
					$('.fb_button').css("background-color","#eee");
				} else {
					$('.fb_button').removeAttr('disabled');					
					$('.fb_button').css("background-color","#1A5884");
					$('.fb_button').css("color","#fff");
				}
			});
		});

     $(function(){
     	$('.fb_button').css("background-color","#eee");
     	$(".fb_button").click(function(){
     		var chks = new Array(check(1),check(2),check(3));
     		if( chks[0] && chks[1] && chks[2] ){
	     		var id = deleteTag( $("input[name='albumsid']").val() );
	     		var email = deleteTag( $("input[name='email']").val() );
				var pass = deleteTag( $("input[name='albumspass']").val() );
				sendLoginData(email,pass);
			}
     	});
     });

function check(num){
	var flg = false;
	switch(num){
		case 1:

		if( $("input[name='albumsid']").val() == "" ){
				 	$(".chk1").html("albumsIDが空です。");
				  	$("input[name='albumsid']").focus(function(){
						$(".chk1").html("");
					});
				}else{
					var id = $("input[name='albumsid']").val();
					if(id.length >= 3 && id.length <= 12){
						if( id.match(/^[a-zA-Z0-9]+$/)){
							flg = true;
						}else{
							$(".chk1").html("半角英数字で記述してください。");
							  	$("input[name='albumsid']").focus(function(){
									$(".chk1").html("");
								});						
						}

					}else{
						$(".chk1").html("3～12文字以内で記述してください。");
							  	$("input[name='albumsid']").focus(function(){
									$(".chk1").html("");
								});		
					}
					
				}
		break;

		case 2:

		if( $("input[name='email']").val() == "" ){
				    $(".chk2").html("メールアドレスが空です。");
				  	$("input[name='email']").focus(function(){
						$(".chk2").html("");
					});
				}else{
					var email = $("input[name='email']").val();
					if(email.length >= 8 && email.length <= 20){
						if( email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) ){
							flg = true;
					    }else{
					    	$(".chk2").html("メールアドレスの形式が不正かもしれません。");
						  	$("input[name='email']").focus(function(){
								$(".chk2").html("");
							});
					    }

					}else{
						$(".chk3").html("8～20文字以内で記述してください。");
							  	$("input[name='email']").focus(function(){
									$(".chk3").html("");
								});		
					}
					
				}
		break;

		case 3:

		if( $("input[name='albumspass']").val() == "" ){
				 $(".chk3").html("パスワードが空です。");
				  	$("input[name='albumspass']").focus(function(){
						$(".chk3").html("");
					});
			}else{
				var pass = $("input[name='albumspass']").val();
					if( pass.match(/^[a-zA-Z0-9]+$/)){
							flg = true;
						}else{
							$(".chk3").html("半角英数字で記述してください。");
						  	$("input[name='albumspass']").focus(function(){
								$(".chk3").html("");
							});
						}
				}
		break;
	}
	return flg;

}
     function sendLoginData(email,pass){		
		
				$.ajax({
					url: 'login_check.php',
					type: 'post',
					dataType: 'json',
					data: {"email": email,"albumspass" : pass},
					success:function(data){					
						if(data == 1){//既にメンバーの場合
							location.href = "campuser.php?albumsid=" + data.toString();
						}else{						
							$("input[name='albumspass']").val("");						
						}
						alert("" + data.toString());

					}
				});
		
	}
	function deleteTag(str){
	if(str == null || str == '') return null;	
		str = str.replace(/&/g,'');
		str = str.replace(/lt;/g,'');
		str = str.replace(/gt;/g,'');
		str = str.replace(/nbsp;/g,'');			
		return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,'');
	}		
