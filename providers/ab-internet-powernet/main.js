﻿/**
Провайдер AnyBalance (http://any-balance-providers.googlecode.com)
*/

var g_headers = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Charset': 'windows-1251,utf-8;q=0.7,*;q=0.3',
	'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
	'Connection': 'keep-alive',
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',
};

function main() {
	var prefs = AnyBalance.getPreferences();
	var baseurl = 'http://www.powernet.com.ru/';
	AnyBalance.setDefaultCharset('utf-8');
	
	checkEmpty(prefs.login, 'Введите логин!');
	checkEmpty(prefs.password, 'Введите пароль!');
	
	var html = AnyBalance.requestPost(baseurl + 'moneypass.php', {
		uname: prefs.login,
		pass: prefs.password,
		'Remember': 'false'
	}, addHeaders({Referer: baseurl + 'moneypass.php'}));
	
	var balance = getParam(html, null, null, /<span[^>]+class="abon_info_balance"[^>]*>([\s\S]*?)<\/span>/i, [/.*<br[^>]*>/i, '', replaceTagsAndSpaces], parseBalance);

	if (!isset(balance)) {
		var error = getParam(html, null, null, /<font[^>]+color="#cc1111"[^>]*>([\s\S]*?)<a[^>]+href="[^"]*moneypass/i, replaceTagsAndSpaces, html_entity_decode);
		if (error)
			throw new AnyBalance.Error(error, null, /Пользователь не обнаружен/i.test(error));
		
		AnyBalance.trace(html);
		throw new AnyBalance.Error('Не удалось зайти в личный кабинет. Сайт изменен?');
	}
	
	var result = {success: true};
	
	getParam(balance, result, 'balance');
	getParam(prefs.login, result, '__tariff');
	
	AnyBalance.setResult(result);
}