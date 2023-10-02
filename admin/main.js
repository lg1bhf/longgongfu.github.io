// MAIN FUNCTIONS

main()

function main () {
	render(getCurriculum(), getPageName())
}

async function render (curriculum, pageName) {
	vocabStr = await session("vocab")
	vocab = JSON.parse(vocabStr)
	if (pageName == "index") {
		$("#header").html(headerHTML(vocab, curriculum, [
			{ text: vocab.demo[curriculum], onclick: "location.href='./record.php'" },
			{ text: vocab.login[curriculum], onclick: "loginModal()" }
		]))
		$("#content").html(`
			<div class="w3-display-container w3-animate-opacity">
				<img src="../images/cover.png" style="width: 100%; min-height: 300px; max-height: 450px;">
				<div class="w3-container w3-display-bottomleft w3-margin-bottom">  
					<a href="#material" class="w3-button w3-xlarge w3-theme w3-hover-teal">` + vocab.list_of_topics[curriculum] + `</a>
				</div>
			</div>
			<div id="about" style="margin-bottom: -40px;">
				<div class="w3-row-padding w3-padding-16 w3-center">
					<h2>` + vocab.about_us[curriculum] + `</h2>
					<div class="about">` + vocab.under_construction[curriculum] + `</div>
				</div>
			</div>
			<div id="material" style="padding-top: 40px;">
				<div class="w3-row-padding w3-padding-16 w3-center w3-theme-l1">
					<h2>` + vocab.list_of_topics[curriculum] + `</h2>
					<div class="material">` + vocab.under_construction[curriculum] + `</div>
				</div>        
			</div>
			<div id="contact">
				<div class="w3-row-padding w3-padding-16 w3-center">
					<h2>` + vocab.contact_us[curriculum] + `</h2>
					<p>` + vocab.address[curriculum] + `</p>
					<p><a href="tel:+85221171013">+852 2117 1013</a></p>
					<p><a href="mailto:zfnumc@gmail.com">zfnumc@gmail.com</a></p>
				</div>
			</div>
		`)
		browserInfo = getBrowser()
		installModal(browserInfo.system, browserInfo.supporter, browserInfo.shell, curriculum, vocab)
	}
	if (pageName == "record") {
		$("#header").html(headerHTML(vocab, curriculum, [
			{ text: vocab.settings[curriculum], onclick: "alert('" + vocab.under_construction[curriculum] + "')" },
			{ text: vocab.logout[curriculum], onclick: "" }
		]))
		$("#content").html(`
			<div class="w3-container w3-center" style="padding-top: 16px;">
				<h2>` + vocab.record[curriculum] + `</h2>
			</div>
			<div class="w3-container">
				<table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
					<tr>
						<td>1A</td>
						<td>1</td>
						<td>陳大文</td>
						<td>` + vocab.some_topic[curriculum] + `</td>
						<td>&#10004;</td>
					</tr>
					<tr>
						<td>1A</td>
						<td>2</td>
						<td>李小明</td>
						<td>` + vocab.some_topic[curriculum] + `</td>
						<td>&#10008;</td>
					</tr>
				</table>
			</div>
		`)
	}
	d = new Date()
	$("#footer").html("<p class='w3-theme-d1 w3-center' style='font-size: 16px; margin: 0; padding: 8px 16px;'>&copy; " + d.getFullYear() + "</p>")
}

// OTHER FUNCTIONS

function addModal (id, title, content) {
	$(".w3-modal").remove()
	$("#content").after(`
		<div class="w3-modal" id="` + id + `">
			<div class="w3-modal-content w3-card-4 w3-animate-top">
				<div class="w3-container w3-teal w3-display-container">
					<span onclick="removeModal()" class="w3-button w3-teal w3-display-topright"><i class="fa fa-remove"></i></span>
					<h4 class="w3-center">` + title + `</h4>
				</div>
				<div class="w3-container w3-card-4 w3-padding-16 w3-white">` + content + `</div>
			</div>
		</div>
	`)
	$(".w3-modal").css("display", "block")
}

function btnHTML (id, text, onclick) {
	return "<button onclick='" + onclick + "' class='w3-button w3-theme' id='" + id + "'>" + text + "</button>"
}

function center (element) {
	return "<div class='w3-center'>" + element + "</div>"
}

function getBrowser () {
	system = "unknown"
	if (testUA(/windows|win32|win64|wow32|wow64/ig)) {
		system = "windows"
	} else if (testUA(/macintosh|macintel/ig)) {
		system = "macos"
	} else if (testUA(/x11/ig)) {
		system = "linux"
	} else if (testUA(/android|adr/ig)) {
		system = "android"
	} else if (testUA(/ios|iphone|ipad|ipod|iwatch/ig)) {
		system = "ios"
	}
	supporter = "unknown"
	if (testUA(/applewebkit/ig) && testUA(/safari/ig)) {
		if (testUA(/edge/ig)) {
			supporter = "edge"
		} else if (testUA(/opr/ig)) {
			supporter = "opera"
		} else if (testUA(/chrome/ig)) {
			supporter = "chrome"
		} else {
			supporter = "safari"
		}
	} else if (testUA(/gecko/ig) && testUA(/firefox/ig)) {
		supporter = "firefox"
	} else if (testUA(/presto/ig)) {
		supporter = "opera"
	} else if (testUA(/trident|compatible|msie/ig)) {
		supporter = "iexplore"
	}
	shell = "none";
	if (testUA(/micromessenger/ig)) {
		shell = "wechat"
	} else if (testUA(/qqbrowser/ig)) {
		shell = "qq"
	} else if (testUA(/ucbrowser/ig)) {
		shell = "uc"
	} else if (testUA(/2345explorer/ig)) {
		shell = "2345"
	} else if (testUA(/metasr/ig)) {
		shell = "sogou"
	} else if (testUA(/lbbrowser/ig)) {
		shell = "liebao"
	} else if (testUA(/maxthon/ig)) {
		shell = "maxthon"
	} else if (testUA(/baidubrowser/ig)) {
		shell = "baidu"
	}
	return { system: system, supporter: supporter, shell: shell }
}

function getCurriculum () {
	path = location.pathname.split("/")
	if (path.length == 1) {
		return ""
	} else {
		return path[1]
	}
}

function getPageName () {
	path = location.pathname.split("/")
	result = path[path.length - 1].split(".")[0]
	if (result == "") {
		return "index"
	} else {
		return result
	}
}

function headerHTML (vocab, curriculum, buttons) {
	// buttons = [ { text: "...", onclick: "..." }, ... ]
	html = ""
	for (button of buttons) {
		html = html + "<button onclick=\"" + button.onclick + "\" class='w3-bar-item w3-button w3-hover-white' style='padding: 8px;'>" + button.text + "</button>"
	}
	return `
		<div class="w3-top">
			<div class="w3-bar w3-theme-d2 w3-left-align" style="font-size: 16px; display: flex;">
				<div style="margin-right: auto;">
					<a href="./" class="w3-bar-item w3-button w3-teal" style="display: flex; padding: 8px;">
						<img src="../images/512x512.png" style="width: 24px; margin-top: auto; margin-bottom: auto;">
					</a>
					<div class="w3-dropdown-hover">
						<button class="w3-button" style="padding: 8px;">` + vocab.zfnum[curriculum] + ` <i class="fa fa-caret-down"></i></button>     
						<div class="w3-dropdown-content w3-card-4 w3-bar-block" style="min-width: 0;">
							<button onclick="switchLanguage($(this))" class="w3-bar-item w3-button" id="chi">` + vocab.region.chi + `</button>
							<button onclick="switchLanguage($(this))" class="w3-bar-item w3-button" id="eng">` + vocab.region.eng + `</button>
						</div>
					</div>					
				</div>
				` + html + `
			</div>
		</div>
	`
}

function inputHTML (id, label, type="text") {
	return `
		<div class="w3-section ` + id + `">
			<label>` + label + `</label>
			<input class="w3-input" id="` + id + `" type="` + type + `">
		</div>
	`
}

function installModal (system, supporter, shell, curriculum, vocab) {
	if (system == "android" && supporter == "chrome" && shell == "none") {
		window.addEventListener("beforeinstallprompt", function (e) {
			e.preventDefault()
			deferredPrompt = e
			addModal("a2hs", vocab.a2hs[curriculum], center(btnHTML("add", vocab.add[curriculum], "")))
			$("#add").click(function () {
				$("#a2hs").remove()
				deferredPrompt.prompt()
				deferredPrompt.userChoice.then(function () {
					deferredPrompt = null
				})
			})
		})
	}
	if (system == "ios" && supporter == "safari" && shell == "none") {
		if (!window.navigator.standalone) {
			$(function () {
				addModal("a2hs", a2hs[curriculum], `
					<ol>
						<li>` + vocab.press[curriculum] + ` <img src="../images/share.png" style="height: 1rem; padding-bottom: 0.2rem;"></li>
						<li>` + vocab.pressA2HS[curriculum] + `</li>
						<li>` + vocab.pressAdd[curriculum] + `</li>
					</ol>
				`)
			})
		}
	}
}

async function login () {
	result = await post({
		name: "login",
		username: $("#username").val(),
		password: $("#password").val()
	})
	if (result[0] == "_") {
		vocabStr = await session("vocab")
		vocab = JSON.parse(vocabStr)
		alert(vocab[result.substr(1)][getCurriculum()])	
	}
	if (result == "C") {
		location.href = "./exercise.php"
	}
	if (result == "P" || result == "S") {
		location.href = "./dashboard.php"
	}
}

async function loginModal () {
	curriculum = getCurriculum()
	vocabStr = await session("vocab")
	vocab = JSON.parse(vocabStr)
	addModal("loginModal", vocab.login[curriculum], [
		inputHTML("username", vocab.username[curriculum]),
		inputHTML("password", vocab.password[curriculum], "password"),
		btnHTML("login", vocab.login[curriculum], "")
	].join(""))
}

async function logout () {
	await post({
		name: "logout"
	})
	location.href = "./"
}

function post (data) {
	return new Promise(function (resolve) {
		$.post("../ajax.php", data, function (response) {
			resolve(response.trim())
		})
	})
}

function radioHTML (id, label, options, onchange) {
	optionsHTML = ""
	for (key in options) {
		optionsHTML = optionsHTML + "<div><input class='w3-radio' type='radio' name='" + id + "' value='" + key + "' onchnage='" + onchange + "'>" + options[key] + "</div>"
	}
	return "<div class='w3-section' id='" + id + "'><label>" + label + "</label>" + optionsHTML + "</div>"
}

async function register () {
	vocabStr = await session("vocab")
	vocab = JSON.parse(vocabStr)
	username = $("#username").val()
	password = $("#password").val()
	confirmPassword = $("#confirm").val()
	if (password == confirmPassword) {
		roleSelector = $("input[name=role]:checked")
		if (roleSelector.length > 0) {
			role = roleSelector.val()
			if (role == "C" || role == "P") {
				result = await post({
					name: "register",
					username: username,
					password: password,
					role: role
				})
			}
			if (role == "S") {
				specialPassword = $("#specialPassword").val()
				confirmSpecialPassword = $("#confirmSpecialPassword").val()
				if (specialPassword == confirmSpecialPassword) {
					result = await post({
						name: "register",
						username: username,
						password: password,
						role: "S",
						special: specialPassword
					})
				} else {
					alert(vocab.special_passwords_do_not_match[getCurriculum()])
					result = ""
				}
			}
			if (result) {
				if (result[0] == "_") {
					vocabStr = await session("vocab")
					vocab = JSON.parse(vocabStr)
					alert(vocab[result.substr(1)][getCurriculum()])
				}
				if (result == "C") {
					location.href = "./exercise.php"
				}
				if (result == "P" || result == "S") {
					location.href = "./dashboard.php"
				}	
			}
		} else {
			alert(vocab.please_select_user_category[getCurriculum()])
		}
	} else {
		alert(vocab.passwords_do_not_match[getCurriculum()])
	}
}

async function registerModal () {
	curriculum = getCurriculum()
	vocabStr = await session("vocab")
	vocab = JSON.parse(vocabStr)
	addModal("registerModal", vocab.register[curriculum], [
		inputHTML("username", vocab.username[curriculum]),
		inputHTML("password", vocab.password[curriculum], "password"),
		inputHTML("confirm", vocab.confirm_password[curriculum], "password"),
		radioHTML("role", vocab.user_category[curriculum], {
			C: vocab.student[curriculum],
			P: vocab.parent[curriculum],
			S: vocab.school[curriculum]
		}, "specialPasswordInput()"),
		btnHTML("register", vocab.register[version], "register()")		
	].join(""))
	$("")
}

function removeModal () {
	$(".w3-modal").remove()
}

async function selectChildAccount () {
	result = await post({
		name: "select_child_account"
	})
	return JSON.parse(result)
}

async function selectOwnAccount () {
	result = await post({
		name: "select_own_account"
	})
	return JSON.parse(result)
}

async function session (key, val=null) {
	result = await post({
		name: "session",
		key: key,
		val: val
	})
	return result
}

async function specialPasswordInput () {
	if ($("input[name=role]").val() == "S") {
		curriculum = getCurriculum()
		vocabStr = await session("vocab")
		vocab = JSON.parse(vocabStr)
		$("#role").after([
			inputHTML("specialPassword", vocab.special_password_with_explanation[curriculum], "password"),
			inputHTML("confirmSpecialPassword", vocab.confirm_special_password[curriculum], "password"),
		].join(""))
	} else {
		$(".specialPassword, .confirmSpecialPassword").remove()
	}
}

function switchLanguage (selector) {
	path = location.pathname.split("/")
	path[path.length - 2] = selector.attr("id")
	location.pathname = path.join("/")
}

function testUA (regexp) {
	return regexp.test(navigator.userAgent.toLowerCase())
}

async function updatePassword (newPassword, confirmPassword, specialPassword="") {
	if (newPassword) {
		if (newPassword == confirmPassword) {
			result = await post({
				name: "update_password",
				new: newPassword,
				special: specialPassword
			})
			alert(vocab[result.substr(0)][getCurriculum()])
		} else {
			alert(vocab.passwords_do_not_match[getCurriculum()])
		}
	} else {
		alert(vocab.password_invalid[getCurriculum()])
	}
}

function updatePersonal (parent, school, year, stream, num) {
	post({
		name: "update_personal",
		parent: parent,
		school: school,
		year: year,
		stream, stream,
		num: num
	})
}

async function updateSpecialPassword (newSpecialPassword, confirmSpecialPassword, specialPassword) {
	if (newSpecialPassword) {
		if (newSpecialPassword == confirmSpecialPassword) {
			result = await post({
				name: "update_special_password",
				new: newSpecialPassword,
				special: specialPassword
			})
			alert(vocab[result.substr(0)][getCurriculum()])
		} else {
			alert(vocab.special_passwords_do_not_match[getCurriculum()])
		}
	} else {
		alert(vocab.special_password_invalid[getCurriculum()])
	}
}

function updateStreamOrder (classOrder, specialPassword) {
	post({
		name: "update_class_order",
		class: JSON.stringify(classOrder),
		special: specialPassword
	})
}