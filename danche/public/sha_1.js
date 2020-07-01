//sha1在线加密脚本
var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_sha1(a) {
	return binb2hex(core_sha1(str2binb(a), a.length * chrsz))
}
function b64_sha1(a) {
	return binb2b64(core_sha1(str2binb(a), a.length * chrsz))
}
function str_sha1(a) {
	return binb2str(core_sha1(str2binb(a), a.length * chrsz))
}
function hex_hmac_sha1(a, b) {
	return binb2hex(core_hmac_sha1(a, b))
}
function b64_hmac_sha1(a, b) {
	return binb2b64(core_hmac_sha1(a, b))
}
function str_hmac_sha1(a, b) {
	return binb2str(core_hmac_sha1(a, b))
}
function sha1_vm_test() {
	return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d"
}
function core_sha1(u, o) {
	u[o >> 5] |= 128 << (24 - o % 32);
	u[((o + 64 >> 9) << 4) + 15] = o;
	var y = Array(80);
	var v = 1732584193;
	var s = -271733879;
	var r = -1732584194;
	var q = 271733878;
	var p = -1009589776;
	for (var l = 0; l < u.length; l += 16) {
		var n = v;
		var m = s;
		var k = r;
		var h = q;
		var f = p;
		for (var g = 0; g < 80; g++) {
			if (g < 16) {
				y[g] = u[l + g]
			} else {
				y[g] = rol(y[g - 3] ^ y[g - 8] ^ y[g - 14] ^ y[g - 16], 1)
			}
			var z = safe_add(safe_add(rol(v, 5), sha1_ft(g, s, r, q)), safe_add(safe_add(p, y[g]), sha1_kt(g)));
			p = q;
			q = r;
			r = rol(s, 30);
			s = v;
			v = z
		}
		v = safe_add(v, n);
		s = safe_add(s, m);
		r = safe_add(r, k);
		q = safe_add(q, h);
		p = safe_add(p, f)
	}
	return Array(v, s, r, q, p)
}
function sha1_ft(e, a, g, f) {
	if (e < 20) {
		return (a & g) | ((~a) & f)
	}
	if (e < 40) {
		return a ^ g ^ f
	}
	if (e < 60) {
		return (a & g) | (a & f) | (g & f)
	}
	return a ^ g ^ f
}
function sha1_kt(a) {
	return (a < 20) ? 1518500249 : (a < 40) ? 1859775393 : (a < 60) ? -1894007588 : -899497514
}
function core_hmac_sha1(c, f) {
	var e = str2binb(c);
	if (e.length > 16) {
		e = core_sha1(e, c.length * chrsz)
	}
	var a = Array(16),
	d = Array(16);
	for (var b = 0; b < 16; b++) {
		a[b] = e[b] ^ 909522486;
		d[b] = e[b] ^ 1549556828
	}
	var g = core_sha1(a.concat(str2binb(f)), 512 + f.length * chrsz);
	return core_sha1(d.concat(g), 512 + 160)
}
function safe_add(a, d) {
	var c = (a & 65535) + (d & 65535);
	var b = (a >> 16) + (d >> 16) + (c >> 16);
	return (b << 16) | (c & 65535)
}
function rol(a, b) {
	return (a << b) | (a >>> (32 - b))
}
function str2binb(d) {
	var c = Array();
	var a = (1 << chrsz) - 1;
	for (var b = 0; b < d.length * chrsz; b += chrsz) {
		c[b >> 5] |= (d.charCodeAt(b / chrsz) & a) << (24 - b % 32)
	}
	return c
}
function binb2str(c) {
	var d = "";
	var a = (1 << chrsz) - 1;
	for (var b = 0; b < c.length * 32; b += chrsz) {
		d += String.fromCharCode((c[b >> 5] >>> (24 - b % 32)) & a)
	}
	return d
}
function binb2hex(c) {
	var b = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
	var d = "";
	for (var a = 0; a < c.length * 4; a++) {
		d += b.charAt((c[a >> 2] >> ((3 - a % 4) * 8 + 4)) & 15) + b.charAt((c[a >> 2] >> ((3 - a % 4) * 8)) & 15)
	}
	return d
}
function binb2b64(d) {
	var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var f = "";
	for (var b = 0; b < d.length * 4; b += 3) {
		var e = (((d[b >> 2] >> 8 * (3 - b % 4)) & 255) << 16) | (((d[b + 1 >> 2] >> 8 * (3 - (b + 1) % 4)) & 255) << 8) | ((d[b + 2 >> 2] >> 8 * (3 - (b + 2) % 4)) & 255);
		for (var a = 0; a < 4; a++) {
			if (b * 8 + a * 6 > d.length * 32) {
				f += b64pad
			} else {
				f += c.charAt((e >> 6 * (3 - a)) & 63)
			}
		}
	}
	return f
};