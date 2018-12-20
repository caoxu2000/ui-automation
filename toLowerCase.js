var toLowerCase = function(str) {
	var upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var lowerCase = 'abcdefghijklmnopqrstuvwxyz';
	
	for(var i = 0; i < str.length; i++) {
		if (upperCase.indexOf(str[i]) != -1) {
			str = str.replace(str[i], lowerCase[upperCase.indexOf(str[i])]);
		}
	}
	return str;
}


var solution = function(s) {
	var result = [];

	helper(result, s, 0, []);
	return result;

	var helper = function(result, s, start, current) {
		if (start == s.length) {
			result.push(current);
			return result;
		}
		for(var i = start; i < s.length; i++) {
			var subString = s.substring(start, i + 1);

			if (!isPalindrome(subString)) continue;
			current.push(subString);
			helper(result, s, i + 1, current);
			current.pop();
		}
	}
	var isPalindrome = function(s) {
		if (s == '') return true;
		
	}
}