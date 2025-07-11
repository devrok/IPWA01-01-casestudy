const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
global.window = dom.window;
global.document = dom.window.document;

// Jetzt kannst du deine utils.js importieren, z.B.:
require('../assets/js/utils.js');

const assert = require('assert');

// Da die Funktionen im Browser als window-Funktionen definiert sind,
// müssen wir sie für Node.js importieren oder mocken.
// Für einen echten Browser-Test empfiehlt sich z.B. jsdom.

describe('escapeHtml', function() {
    it('should escape &, <, >, ", and \'', function() {
        assert.strictEqual(
            window.escapeHtml('<script>alert("XSS") & more</script>'),
            '&lt;script&gt;alert(&quot;XSS&quot;) &amp; more&lt;/script&gt;'
        );
        assert.strictEqual(
            window.escapeHtml('O\'Reilly & "Co"'),
            'O&#039;Reilly &amp; &quot;Co&quot;'
        );
    });
    it('should return empty string for empty input', function() {
        assert.strictEqual(window.escapeHtml(''), '');
    });
});

describe('validateEmail', function() {
    it('should validate correct emails', function() {
        assert.strictEqual(window.validateEmail('test@example.com'), true);
        assert.strictEqual(window.validateEmail('user.name+tag@domain.co.uk'), true);
    });
    it('should invalidate incorrect emails', function() {
        assert.strictEqual(window.validateEmail('test@'), false);
        assert.strictEqual(window.validateEmail('test@.com'), false);
        assert.strictEqual(window.validateEmail('test.com'), false);
        assert.strictEqual(window.validateEmail(''), false);
    });
});

describe('getLanguage', function() {
    let originalLang;
    before(function() {
        originalLang = document.documentElement.lang;
    });
    after(function() {
        document.documentElement.lang = originalLang;
    });
    it('should return the set language', function() {
        document.documentElement.lang = 'en-US';
        assert.strictEqual(window.getLanguage(), 'en-US');
        document.documentElement.lang = 'ar';
        assert.strictEqual(window.getLanguage(), 'ar');
    });
    it('should default to de-DE if no lang is set', function() {
        document.documentElement.lang = '';
        assert.strictEqual(window.getLanguage(), 'de-DE');
    });
});