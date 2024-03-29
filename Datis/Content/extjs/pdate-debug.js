﻿/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
* @class Ext.PDate
* A set of useful static methods to deal with date
* Note that if Ext.PDate is required and loaded, it will copy all methods / properties to
* this object for convenience
*
* The date parsing and formatting syntax contains a subset of
* <a href="http://www.php.net/date">PHP's date() function</a>, and the formats that are
* supported will provide results equivalent to their PHP versions.
*
* The following is a list of all currently supported formats:
* <pre class="">
Format  Description                                                               Example returned values
------  -----------------------------------------------------------------------   -----------------------
d     Day of the month, 2 digits with leading zeros                             01 to 31
D     A short textual representation of the day of the week                     Mon to Sun
j     Day of the month without leading zeros                                    1 to 31
l     A full textual representation of the day of the week                      Sunday to Saturday
N     ISO-8601 numeric representation of the day of the week                    1 (for Monday) through 7 (for Sunday)
S     English ordinal suffix for the day of the month, 2 characters             st, nd, rd or th. Works well with j
w     Numeric representation of the day of the week                             0 (for Sunday) to 6 (for Saturday)
z     The day of the year (starting from 0)                                     0 to 364 (365 in leap years)
W     ISO-8601 week number of year, weeks starting on Monday                    01 to 53
F     A full textual representation of a month, such as January or March        January to December
m     Numeric representation of a month, with leading zeros                     01 to 12
M     A short textual representation of a month                                 Jan to Dec
n     Numeric representation of a month, without leading zeros                  1 to 12
t     Number of days in the given month                                         28 to 31
L     Whether it&#39;s a leap year                                                  1 if it is a leap year, 0 otherwise.
o     ISO-8601 year number (identical to (Y), but if the ISO week number (W)    Examples: 1998 or 2004
belongs to the previous or next year, that year is used instead)
Y     A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
y     A two digit representation of a year                                      Examples: 99 or 03
a     Lowercase Ante meridiem and Post meridiem                                 am or pm
A     Uppercase Ante meridiem and Post meridiem                                 AM or PM
g     12-hour format of an hour without leading zeros                           1 to 12
G     24-hour format of an hour without leading zeros                           0 to 23
h     12-hour format of an hour with leading zeros                              01 to 12
H     24-hour format of an hour with leading zeros                              00 to 23
i     Minutes, with leading zeros                                               00 to 59
s     Seconds, with leading zeros                                               00 to 59
u     Decimal fraction of a second                                              Examples:
(minimum 1 digit, arbitrary number of digits allowed)                     001 (i.e. 0.001s) or
100 (i.e. 0.100s) or
999 (i.e. 0.999s) or
999876543210 (i.e. 0.999876543210s)
O     Difference to Greenwich time (GMT) in hours and minutes                   Example: +1030
P     Difference to Greenwich time (GMT) with colon between hours and minutes   Example: -08:00
T     Timezone abbreviation of the machine running the code                     Examples: EST, MDT, PDT ...
Z     Timezone offset in seconds (negative if west of UTC, positive if east)    -43200 to 50400
c     ISO 8601 date
Notes:                                                                    Examples:
1) If unspecified, the month / day defaults to the current month / day,   1991 or
the time defaults to midnight, while the timezone defaults to the      1992-10 or
browser's timezone. If a time is specified, it must include both hours 1993-09-20 or
and minutes. The "T" delimiter, seconds, milliseconds and timezone     1994-08-19T16:20+01:00 or
are optional.                                                          1995-07-18T17:21:28-02:00 or
2) The decimal fraction of a second, if specified, must contain at        1996-06-17T18:22:29.98765+03:00 or
least 1 digit (there is no limit to the maximum number                 1997-05-16T19:23:30,12345-0400 or
of digits allowed), and may be delimited by either a '.' or a ','      1998-04-15T20:24:31.2468Z or
Refer to the examples on the right for the various levels of              1999-03-14T20:24:32Z or
date-time granularity which are supported, or see                         2000-02-13T21:25:33
http://www.w3.org/TR/NOTE-datetime for more info.                         2001-01-12 22:26:34
U     Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                1193432466 or -2138434463
MS    Microsoft AJAX serialized dates                                           \/Date(1238606590509)\/ (i.e. UTC milliseconds since epoch) or
\/Date(1238606590509+0800)\/
</pre>
*
* Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
* <pre><code>
// Sample date:
// 'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'

var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
console.log(Ext.PDate.format(dt, 'Y-m-d'));                          // 2007-01-10
console.log(Ext.PDate.format(dt, 'F j, Y, g:i a'));                  // January 10, 2007, 3:05 pm
console.log(Ext.PDate.format(dt, 'l, \\t\\he jS \\of F Y h:i:s A')); // Wednesday, the 10th of January 2007 03:05:01 PM
</code></pre>
*
* Here are some standard date/time patterns that you might find helpful.  They
* are not part of the source of Ext.PDate, but to use them you can simply copy this
* block of code into any script that is included after Ext.PDate and they will also become
* globally available on the Date object.  Feel free to add or remove patterns as needed in your code.
* <pre><code>
Ext.PDate.patterns = {
ISO8601Long:"Y-m-d H:i:s",
ISO8601Short:"Y-m-d",
ShortDate: "n/j/Y",
LongDate: "l, F d, Y",
FullDateTime: "l, F d, Y g:i:s A",
MonthDay: "F d",
ShortTime: "g:i A",
LongTime: "g:i:s A",
SortableDateTime: "Y-m-d\\TH:i:s",
UniversalSortableDateTime: "Y-m-d H:i:sO",
YearMonth: "F, Y"
};
</code></pre>
*
* Example usage:
* <pre><code>
var dt = new Date();
console.log(Ext.PDate.format(dt, Ext.PDate.patterns.ShortDate));
</code></pre>
* <p>Developer-written, custom formats may be used by supplying both a formatting and a parsing function
* which perform to specialized requirements. The functions are stored in {@link #parseFunctions} and {@link #formatFunctions}.</p>
* @singleton
*/

/*
* Most of the date-formatting functions below are the excellent work of Baron Schwartz.
* (see http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/)
* They generate precompiled functions from format patterns instead of parsing and
* processing each pattern every time a date is formatted. These functions are available
* on every Date object.
*/

(function () {

    // create private copy of Ext's Ext.util.Format.format() method
    // - to remove unnecessary dependency
    // - to resolve namespace conflict with MS-Ajax's implementation
    function xf(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }

    Ext.PDate = {

        g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],

        PersianToGregorian: function (jy, jm, jd) {

            var jy = parseInt(jy) - 979,
			jm = parseInt(jm) - 1,
			jd = parseInt(jd) - 1,
			j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4),
			g_day_no,
			leap,
			gm;

            for (var i = 0; i < jm; ++i)
                j_day_no += Ext.PDate.j_days_in_month[i];

            j_day_no += jd;

            g_day_no = j_day_no + 79,
			gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
            g_day_no = g_day_no % 146097;

            leap = true;
            if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
                g_day_no--;
                gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
                g_day_no = g_day_no % 36524;

                if (g_day_no >= 365)
                    g_day_no++;
                else
                    leap = false;
            }

            gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
            g_day_no %= 1461;

            if (g_day_no >= 366) {
                leap = false;

                g_day_no--;
                gy += parseInt(g_day_no / 365);
                g_day_no = g_day_no % 365;
            }

            for (var i = 0; g_day_no >= Ext.PDate.g_days_in_month[i] + (i == 1 && leap) ; i++)
                g_day_no -= Ext.PDate.g_days_in_month[i] + (i == 1 && leap);
            gm = i + 1,
			gd = g_day_no + 1;

            return [gy, gm, gd];
        },
        GregorianToPersian: function (gy, gm, gd) {
            var gy = parseInt(gy) - 1600,
			gm = parseInt(gm) - 1,
			gd = parseInt(gd) - 1,
			g_day_no = 365 * gy + parseInt((gy + 3) / 4) - parseInt((gy + 99) / 100) + parseInt((gy + 399) / 400),
			j_day_no,
			jy,
			jm;

            for (var i = 0; i < gm; ++i)
                g_day_no += Ext.PDate.g_days_in_month[i];
            if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
                /* leap and after Feb */
                ++g_day_no;
            g_day_no += gd;

            j_day_no = g_day_no - 79,
			j_np = parseInt(j_day_no / 12053);
            j_day_no %= 12053;

            jy = 979 + 33 * j_np + 4 * parseInt(j_day_no / 1461);

            j_day_no %= 1461;

            if (j_day_no >= 366) {
                jy += parseInt((j_day_no - 1) / 365);
                j_day_no = (j_day_no - 1) % 365;
            }

            for (var i = 0; i < 11 && j_day_no >= Ext.PDate.j_days_in_month[i]; ++i) {
                j_day_no -= Ext.PDate.j_days_in_month[i];
            }
            jm = i + 1,
			jd = j_day_no + 1;

            return [jy, jm, jd];
        },
        setFullYear: function (date, y, m, d) {
            var gd = date.getDate(),
			gm = date.getMonth(),
			gy = date.getFullYear(),
			j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);

            if (y < 100)
                y += 1300;

            j[0] = y;
            if (m != undefined) {
                if (m > 11) {
                    j[0] += Math.floor(m / 11);
                    j[1] = (m % 11);
                } else if (m < 0) {
                    j[0] += Math.floor(m / 11);
                    j[1] = (m % 11) + 13;
                } else
                    j[1] = m + 1;

            }
            if (d != undefined)
                j[2] = d;
            var g = Ext.PDate.PersianToGregorian(j[0], j[1], j[2]);
            return date.setFullYear(g[0], g[1] - 1, g[2]);
        },
        setMonth: function (date, m, d) {
            var gd = date.getDate(),
            gm = date.getMonth(),
            gy = date.getFullYear(),
            j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            if (m > 11) {
                j[0] += Math.floor(m / 11);
                j[1] = (m % 11);

            } else if (m < 0) {
                j[0] -= Math.floor((-m) / 11);
                j[0] -= 1;
                j[1] = (m % 11) + 13;
            } else {
                j[1] = m + 1;
            }

            if (d != undefined)
                j[2] = d;

            var g = Ext.PDate.PersianToGregorian(j[0], j[1], j[2]);
            return date.setFullYear(g[0], g[1] - 1, g[2]);
        },

        setDate: function (date, d) {
            var gd = date.getDate(),
            gm = date.getMonth(),
            gy = date.getFullYear(),
            j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            j[2] = d;

            var g = Ext.PDate.PersianToGregorian(j[0], j[1], j[2]);
            return date.setFullYear(g[0], g[1] - 1, g[2]);
        },
        getFullYear: function (date) {
            var gd = date.getDate(),
            gm = date.getMonth(),
            gy = date.getFullYear(),
            j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[0];
        },
        getMonth: function (date) {
            var gd = date.getDate(),
            gm = date.getMonth(),
            gy = date.getFullYear(),
            j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[1] - 1;
        },
        getDate: function (date) {
            var gd = date.getDate(),
            gm = date.getMonth(),
            gy = date.getFullYear(),
            j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[2];
        },
        getDay: function (date) {
            var day = date.getDay();
            day = (day + 1) % 7;
            return day;
        },
        /**
        * Persian UTC functions
        */

        getUTCFullYear: function (date) {
            var gd = date.getUTCDate(),
			gm = date.getUTCMonth(),
			gy = date.getUTCFullYear(),
			j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[0];
        },
        getUTCMonth: function (date) {
            var gd = date.getUTCDate(),
			gm = date.getUTCMonth(),
			gy = date.getUTCFullYear(),
			j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[1] - 1;
        },
        getUTCDate: function (date) {
            var gd = date.getUTCDate(),
			gm = date.getUTCMonth(),
			gy = date.getUTCFullYear(),
			j = Ext.PDate.GregorianToPersian(gy, gm + 1, gd);
            return j[2];
        },
        getUTCDay: function (date) {
            var day = date.getUTCDay();
            day = (day + 1) % 7;
            return day;
        },
        /**
        * Returns the current timestamp
        * @return {Number} The current timestamp
        * @method
        */
        now: Ext.Date.now,

        /**
        * @private
        * Private for now
        */
        toString: function (date) {
            var pad = Ext.String.leftPad;

            return Ext.PDate.getFullYear(date) + "-"
			+ pad(Ext.PDate.getMonth(date) + 1, 2, '0') + "-"
			+ pad(Ext.PDate.getDate(date), 2, '0') + "T"
			+ pad(date.getHours(), 2, '0') + ":"
			+ pad(date.getMinutes(), 2, '0') + ":"
			+ pad(date.getSeconds(), 2, '0');
        },
        /**
        * Returns the number of milliseconds between two dates
        * @param {Date} dateA The first date
        * @param {Date} dateB (optional) The second date, defaults to now
        * @return {Number} The difference in milliseconds
        */
        getElapsed: Ext.Date.getElapsed,

        /**
        * Global flag which determines if strict date parsing should be used.
        * Strict date parsing will not roll-over invalid dates, which is the
        * default behaviour of javascript Date objects.
        * (see {@link #parse} for more information)
        * Defaults to <tt>false</tt>.
        * @static
        * @type Boolean
        */
        useStrict: Ext.Date.useStrict,

        // private
        formatCodeToRegex: function (character, currentGroup) {
            // Note: currentGroup - position in regex result array (see notes for Ext.Date.parseCodes below)
            var p = utilPDate.parseCodes[character];

            if (p) {
                p = typeof p == 'function' ? p() : p;
                utilPDate.parseCodes[character] = p; // reassign function result to prevent repeated execution
            }

            return p ? Ext.applyIf({
                c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
            }, p) : {
                g: 0,
                c: null,
                s: Ext.String.escapeRegex(character) // treat unrecognised characters as literals
            };
        },
        /**
        * <p>An object hash in which each property is a date parsing function. The property name is the
        * format string which that function parses.</p>
        * <p>This object is automatically populated with date parsing functions as
        * date formats are requested for Ext standard formatting strings.</p>
        * <p>Custom parsing functions may be inserted into this object, keyed by a name which from then on
        * may be used as a format string to {@link #parse}.<p>
        * <p>Example:</p><pre><code>
        Ext.PDate.parseFunctions['x-date-format'] = myDateParser;
        </code></pre>
        * <p>A parsing function should return a Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
        * <li><code>date</code> : String<div class="sub-desc">The date string to parse.</div></li>
        * <li><code>strict</code> : Boolean<div class="sub-desc">True to validate date strings while parsing
        * (i.e. prevent javascript Date "rollover") (The default must be false).
        * Invalid date strings should return null when parsed.</div></li>
        * </ul></div></p>
        * <p>To enable Dates to also be <i>formatted</i> according to that format, a corresponding
        * formatting function must be placed into the {@link #formatFunctions} property.
        * @property parseFunctions
        * @static
        * @type Object
        */
        parseFunctions: {
            "MS": function (input, strict) {
                // note: the timezone offset is ignored since the MS Ajax server sends
                // a UTC milliseconds-since-Unix-epoch value (negative values are allowed)
                var re = new RegExp('\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/'),
				    r = (input || '').match(re);
                return r ? new Date(((r[1] || '') + r[2]) * 1) : null;
            }
        },
        parseRegexes: [],

        /**
        * <p>An object hash in which each property is a date formatting function. The property name is the
        * format string which corresponds to the produced formatted date string.</p>
        * <p>This object is automatically populated with date formatting functions as
        * date formats are requested for Ext standard formatting strings.</p>
        * <p>Custom formatting functions may be inserted into this object, keyed by a name which from then on
        * may be used as a format string to {@link #format}. Example:</p><pre><code>
        Ext.PDate.formatFunctions['x-date-format'] = myDateFormatter;
        </code></pre>
        * <p>A formatting function should return a string representation of the passed Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
        * <li><code>date</code> : Date<div class="sub-desc">The Date to format.</div></li>
        * </ul></div></p>
        * <p>To enable date strings to also be <i>parsed</i> according to that format, a corresponding
        * parsing function must be placed into the {@link #parseFunctions} property.
        * @property formatFunctions
        * @static
        * @type Object
        */
        formatFunctions: {
            "MS": function () {
                // UTC milliseconds since Unix epoch (MS-AJAX serialized date format (MRSF))
                return '\\/Date(' + this.getTime() + ')\\/';
            }
        },

        y2kYear: 50,

        /**
        * Date interval constant
        * @static
        * @type String
        */
        MILLI: "ms",

        /**
        * Date interval constant
        * @static
        * @type String
        */
        SECOND: "s",

        /**
        * Date interval constant
        * @static
        * @type String
        */
        MINUTE: "mi",

        /** Date interval constant
        * @static
        * @type String
        */
        HOUR: "h",

        /**
        * Date interval constant
        * @static
        * @type String
        */
        DAY: "d",

        /**
        * Date interval constant
        * @static
        * @type String
        */
        MONTH: "mo",

        /**
        * Date interval constant
        * @static
        * @type String
        */
        YEAR: "y",

        /**
        * <p>An object hash containing default date values used during date parsing.</p>
        * <p>The following properties are available:<div class="mdetail-params"><ul>
        * <li><code>y</code> : Number<div class="sub-desc">The default year value. (defaults to undefined)</div></li>
        * <li><code>m</code> : Number<div class="sub-desc">The default 1-based month value. (defaults to undefined)</div></li>
        * <li><code>d</code> : Number<div class="sub-desc">The default day value. (defaults to undefined)</div></li>
        * <li><code>h</code> : Number<div class="sub-desc">The default hour value. (defaults to undefined)</div></li>
        * <li><code>i</code> : Number<div class="sub-desc">The default minute value. (defaults to undefined)</div></li>
        * <li><code>s</code> : Number<div class="sub-desc">The default second value. (defaults to undefined)</div></li>
        * <li><code>ms</code> : Number<div class="sub-desc">The default millisecond value. (defaults to undefined)</div></li>
        * </ul></div></p>
        * <p>Override these properties to customize the default date values used by the {@link #parse} method.</p>
        * <p><b>Note: In countries which experience Daylight Saving Time (i.e. DST), the <tt>h</tt>, <tt>i</tt>, <tt>s</tt>
        * and <tt>ms</tt> properties may coincide with the exact time in which DST takes effect.
        * It is the responsiblity of the developer to account for this.</b></p>
        * Example Usage:
        * <pre><code>
        // set default day value to the first day of the month
        Ext.PDate.defaults.d = 1;

        // parse a February date string containing only year and month values.
        // setting the default day value to 1 prevents weird date rollover issues
        // when attempting to parse the following date string on, for example, March 31st 2009.
        Ext.PDate.parse('2009-02', 'Y-m'); // returns a Date object representing February 1st 2009
        </code></pre>
        * @property defaults
        * @static
        * @type Object
        */
        defaults: {},

        /**
        * An array of textual day names.
        * Override these values for international dates.
        * Example:
        * <pre><code>
        Ext.PDate.dayNames = [
        'SundayInYourLang',
        'MondayInYourLang',
        ...
        ];
        </code></pre>
        * @type Array
        * @static
        */
        dayNames: ["یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],

        //<locale type="array">
        /**
        * An array of textual month names.
        * Override these values for international dates.
        * Example:
        * <pre><code>
        Ext.PDate.monthNames = [
        'FarvardinInYourLang',
        'OrdibeheshtInYourLang',
        ...
        ];
        </code></pre>
        * @type Array
        * @static
        */
        monthNames: [
		"فروردین",
		"اردیبهشت",
		"خرداد",
		"تیر",
		"امرداد",
		"شهریور",
		"مهر",
		"آبان",
		"آذر",
		"دی",
		"بهمن",
		"اسفند"
        ],

        //</locale>
        //<locale type="array">
        /**
        * An object hash of zero-based javascript month numbers (with short month names as keys. note: keys are case-sensitive).
        * Override these values for international dates.
        * Example:
        * <pre><code>
        Ext.PDate.monthNumbers = {
        'ShortFarNameInYourLang':0,
        'ShortOrdNameInYourLang':1,
        ...
        };
        </code></pre>
        * @type Object
        * @static
        */
        monthNumbers: {
            Far: 0,
            Farvardin: 0,
            Ord: 1,
            Ordibehesht: 1,
            Kho: 2,
            Khordad: 2,
            Tir: 3,
            Mor: 4,
            Mordad: 4,
            Sha: 5,
            Shahrivar: 5,
            Meh: 6,
            Mehr: 6,
            Aba: 7,
            Aban: 7,
            Aza: 8,
            Azar: 8,
            Dey: 9,
            Bah: 10,
            Bahman: 10,
            Esf: 11,
            Esfand: 11
        },
        //</locale>

        //<locale>
        /**
        * <p>The date format string that the {@link Ext.util.Format#dateRenderer}
        * and {@link Ext.util.Format#date} functions use.  See {@link Ext.PDate} for details.</p>
        * <p>This defaults to <code>m/d/Y</code>, but may be overridden in a locale file.</p>
        * @property defaultFormat
        * @static
        * @type String
        */
        defaultFormat: "Y/m/d",
        //</locale>

        /**
        * Get the short month name for the given month number.
        * Override this function for international dates.
        * @param {Number} month A zero-based javascript month number.
        * @return {String} The short month name.
        * @static
        */
        getShortMonthName: function (month) {
            return Ext.PDate.monthNames[month].substring(0, 3);
        },
        //</locale>

        //<locale type="function">
        /**
        * Get the short day name for the given day number.
        * Override this function for international dates.
        * @param {Number} day A zero-based javascript day number.
        * @return {String} The short day name.
        * @static
        */
        //</locale>

        //<locale type="function">
        getShortDayName: function (day) {
            return Ext.PDate.dayNames[day].substring(0, 3);
        },
        //</locale>

        //<locale type="function">
        /**
        * Get the zero-based javascript month number for the given short/full month name.
        * Override this function for international dates.
        * @param {String} name The short/full month name.
        * @return {Number} The zero-based javascript month number.
        * @static
        */
        //</locale>

        //<locale type="function">
        getMonthNumber: function (name) {
            // handle camel casing for english month names (since the keys for the Ext.PDate.monthNumbers hash are case sensitive)
            return Ext.PDate.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        },
        //</locale>

        /**
        * Checks if the specified format contains hour information
        * @param {String} format The format to check
        * @return {Boolean} True if the format contains hour information
        * @static
        * @method
        */
        formatContainsHourInfo: (function () {
            var stripEscapeRe = /(\\.)/g,
			hourInfoRe = /([gGhHisucUOPZ]|MS)/;
            return function (format) {
                return hourInfoRe.test(format.replace(stripEscapeRe, ''));
            };
        }()),
        /**
        * Checks if the specified format contains information about
        * anything other than the time.
        * @param {String} format The format to check
        * @return {Boolean} True if the format contains information about
        * date/day information.
        * @static
        * @method
        */
        formatContainsDateInfo: (function () {
            var stripEscapeRe = /(\\.)/g,
			dateInfoRe = /([djzmnYycU]|MS)/;

            return function (format) {
                return dateInfoRe.test(format.replace(stripEscapeRe, ''));
            };
        }()),

        /**
        * Removes all escaping for a date format string. In date formats,
        * using a '\' can be used to escape special characters.
        * @param {String} format The format to unescape
        * @return {String} The unescaped format
        * @method
        */
        unescapeFormat: (function () {
            var slashRe = /\\/gi;
            return function (format) {
                // Escape the format, since \ can be used to escape special
                // characters in a date format. For example, in a spanish
                // locale the format may be: 'd \\de F \\de Y'
                return format.replace(slashRe, '');
            }
        }()),
        /**
        * The base format-code to formatting-function hashmap used by the {@link #format} method.
        * Formatting functions are strings (or functions which return strings) which
        * will return the appropriate value when evaluated in the context of the Date object
        * from which the {@link #format} method is called.
        * Add to / override these mappings for custom date formatting.
        * Note: Ext.PDate.format() treats characters as literals if an appropriate mapping cannot be found.
        * Example:
        * <pre><code>
        Ext.PDate.formatCodes.x = "Ext.util.Format.leftPad(this.getDate(), 2, '0')";
        console.log(Ext.PDate.format(new Date(), 'X'); // returns the current day of the month
        </code></pre>
        * @type Object
        * @static
        */
        formatCodes: {
            d: "Ext.String.leftPad(Ext.PDate.getDate(this), 2, '0')",
            D: "Ext.PDate.getShortDayName(this.getDay())", // get localised short day name
            j: "Ext.PDate.getDate(this)",
            l: "Ext.PDate.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "Ext.PDate.getSuffix(this)",
            w: "this.getDay()",
            z: "Ext.PDate.getDayOfYear(this)",
            W: "Ext.String.leftPad(Ext.PDate.getWeekOfYear(this), 2, '0')",
            F: "Ext.PDate.monthNames[Ext.PDate.getMonth(this)]",
            m: "Ext.String.leftPad(Ext.PDate.getMonth(this) + 1, 2, '0')",
            M: "Ext.PDate.getShortMonthName(Ext.PDate.getMonth(this))", // get localised short month name
            n: "(Ext.PDate.getMonth(this) + 1)",
            t: "Ext.PDate.getDaysInMonth(this)",
            L: "(Ext.PDate.isLeapYear(this) ? 1 : 0)",
            o: "(Ext.PDate.getFullYear(this) + (Ext.PDate.getWeekOfYear(this) == 1 && Ext.PDate.getMonth(this) > 0 ? +1 : (Ext.PDate.getWeekOfYear(this) >= 52 && Ext.PDate.getMonth(this) < 11 ? -1 : 0)))",
            Y: "Ext.String.leftPad(Ext.PDate.getFullYear(this), 4, '0')",
            y: "('' + Ext.PDate.getFullYear(this)).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "Ext.String.leftPad(this.getHours(), 2, '0')",
            i: "Ext.String.leftPad(this.getMinutes(), 2, '0')",
            s: "Ext.String.leftPad(this.getSeconds(), 2, '0')",
            u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')",
            O: "Ext.PDate.getGMTOffset(this)",
            P: "Ext.{Date.getGMTOffset(this, true)",
            T: "Ext.PDate.getTimezone(this)",
            Z: "(this.getTimezoneOffset() * -60)",

            c: function () { // ISO-8601 -- GMT format
                var c, code, i, l, e;
                for (c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                    e = c.charAt(i);
                    code.push(e == "T" ? "'T'" : utilPDate.getFormatCode(e)); // treat T as a character literal
                }
                return code.join(" + ");
            },
            /*
            c: function() { // ISO-8601 -- UTC format
            return [
            "this.getUTCFullYear()", "'-'",
            "Ext.util.Format.leftPad(this.getUTCMonth() + 1, 2, '0')", "'-'",
            "Ext.util.Format.leftPad(this.getUTCDate(), 2, '0')",
            "'T'",
            "Ext.util.Format.leftPad(this.getUTCHours(), 2, '0')", "':'",
            "Ext.util.Format.leftPad(this.getUTCMinutes(), 2, '0')", "':'",
            "Ext.util.Format.leftPad(this.getUTCSeconds(), 2, '0')",
            "'Z'"
            ].join(" + ");
            },
            */

            U: "Math.round(this.getTime() / 1000)"
        },

        /**
        * Checks if the passed Date parameters will cause a javascript Date "rollover".
        * @param {Number} year 4-digit year
        * @param {Number} month 1-based month-of-year
        * @param {Number} day Day of month
        * @param {Number} hour (optional) Hour
        * @param {Number} minute (optional) Minute
        * @param {Number} second (optional) Second
        * @param {Number} millisecond (optional) Millisecond
        * @return {Boolean} true if the passed parameters do not cause a Date "rollover", false otherwise.
        * @static
        */
        isValid: Ext.Date.isValid,

        /**
        * Parses the passed string using the specified date format.
        * Note that this function expects normal calendar dates, meaning that months are 1-based (i.e. 1 = January).
        * The {@link #defaults} hash will be used for any date value (i.e. year, month, day, hour, minute, second or millisecond)
        * which cannot be found in the passed string. If a corresponding default date value has not been specified in the {@link #defaults} hash,
        * the current date's year, month, day or DST-adjusted zero-hour time value will be used instead.
        * Keep in mind that the input date string must precisely match the specified format string
        * in order for the parse operation to be successful (failed parse operations return a null value).
        * <p>Example:</p><pre><code>
        //dt = Fri May 25 2007 (current date)
        var dt = new Date();

        //dt = Thu May 25 2006 (today&#39;s month/day in 2006)
        dt = Ext.PDate.parse("2006", "Y");

        //dt = Sun Jan 15 2006 (all date parts specified)
        dt = Ext.PDate.parse("2006-01-15", "Y-m-d");

        //dt = Sun Jan 15 2006 15:20:01
        dt = Ext.PDate.parse("2006-01-15 3:20:01 PM", "Y-m-d g:i:s A");

        // attempt to parse Sun Feb 29 2006 03:20:01 in strict mode
        dt = Ext.PDate.parse("2006-02-29 03:20:01", "Y-m-d H:i:s", true); // returns null
        </code></pre>
        * @param {String} input The raw date string.
        * @param {String} format The expected date string format.
        * @param {Boolean} strict (optional) True to validate date strings while parsing (i.e. prevents javascript Date "rollover")
        (defaults to false). Invalid date strings will return null when parsed.
        * @return {Date} The parsed Date.
        * @static
        */
        parse: function (input, format, strict) {
            var p = utilPDate.parseFunctions;
            if (p[format] == null) {
                utilPDate.createParser(format);
            }
            return p[format](input, Ext.isDefined(strict) ? strict : utilPDate.useStrict);
        },
        // Backwards compat
        parseDate: function (input, format, strict) {
            return utilPDate.parse(input, format, strict);
        },
        // private
        getFormatCode: function (character) {
            var f = utilPDate.formatCodes[character];

            if (f) {
                f = typeof f == 'function' ? f() : f;
                utilPDate.formatCodes[character] = f; // reassign function result to prevent repeated execution
            }

            // note: unknown characters are treated as literals
            return f || ("'" + Ext.String.escape(character) + "'");
        },
        // private
        createFormat: function (format) {
            var code = [],
			special = false,
			ch = '',
			i;

            for (i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                } else if (special) {
                    special = false;
                    code.push("'" + Ext.String.escape(ch) + "'");
                } else {
                    code.push(utilPDate.getFormatCode(ch));
                }
            }
            utilPDate.formatFunctions[format] = Ext.functionFactory("return " + code.join('+'));
        },
        // private
        createParser: (function () {
            var code = [
			"var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
			"def = Ext.PDate.defaults,",
			"results = String(input).match(Ext.PDate.parseRegexes[{0}]);", // either null, or an array of matched strings

			"if(results){",
			"{1}",

			"if(u != null){", // i.e. unix time is defined
			"v = new Date(u * 1000);", // give top priority to UNIX time
			"}else{",
            // create Date object representing midnight of the current day;
            // this will provide us with our date defaults
            // (note: clearTime() handles Daylight Saving Time automatically)
			"dt = Ext.PDate.clearTime(new Date);",

            // date calculations (note: these calculations create a dependency on Ext.Number.from())
			"y = Ext.Number.from(y, Ext.Number.from(def.y, Ext.PDate.getFullYear(dt)));",
			"m = Ext.Number.from(m, Ext.Number.from(def.m - 1, Ext.PDate.getMonth(dt)));",
			"d = Ext.Number.from(d, Ext.Number.from(def.d, Ext.PDate.getDate(dt)));",

            // time calculations (note: these calculations create a dependency on Ext.Number.from())
			"h  = Ext.Number.from(h, Ext.Number.from(def.h, dt.getHours()));",
			"i  = Ext.Number.from(i, Ext.Number.from(def.i, dt.getMinutes()));",
			"s  = Ext.Number.from(s, Ext.Number.from(def.s, dt.getSeconds()));",
			"ms = Ext.Number.from(ms, Ext.Number.from(def.ms, dt.getMilliseconds()));",
			"gm=Ext.PDate.PersianToGregorian(y,m+1,d);y=gm[0];m=gm[1]-1;d=gm[2];",

			"if(z >= 0 && y >= 0){",
            // both the year and zero-based day of year are defined and >= 0.
            // these 2 values alone provide sufficient info to create a full date object

            // create Date object representing January 1st for the given year
            // handle years < 100 appropriately
			"v = Ext.Date.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",

            // then add day of year, checking for Date "rollover" if necessary
			"v = !strict? v : (strict === true && (z <= 364 || (Ext.Date.isLeapYear(v) && z <= 365))? Ext.Date.add(v, Ext.Date.DAY, z) : null);",
			"}else if(strict === true && !Ext.Date.isValid(y, m + 1, d, h, i, s, ms)){", // check for Date "rollover"
			"v = null;", // invalid date, so return null
			"}else{",
            // plain old Date object
            // handle years < 100 properly
			"v = Ext.Date.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",
			"}",
			"}",
			"}",

			"if(v){",
            // favour UTC offset over GMT offset
			"if(zz != null){",
            // reset to UTC, then add offset
			"v = Ext.Date.add(v, Ext.Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
			"}else if(o){",
            // reset to GMT, then add offset
			"v = Ext.Date.add(v, Ext.Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
			"}",
			"}",

			"return v;"
            ].join('\n');

            return function (format) {
                var regexNum = utilPDate.parseRegexes.length,
				currentGroup = 1,
				calc = [],
				regex = [],
				special = false,
				ch = "",
                i = 0,
                len = format.length,
                atEnd = [],
                obj;

                for (; i < len; ++i) {
                    ch = format.charAt(i);
                    if (!special && ch == "\\") {
                        special = true;
                    } else if (special) {
                        special = false;
                        regex.push(Ext.String.escape(ch));
                    } else {
                        obj = utilPDate.formatCodeToRegex(ch, currentGroup);
                        currentGroup += obj.g;
                        regex.push(obj.s);
                        if (obj.g && obj.c) {
                            if (obj.calcAtEnd) {
                                atEnd.push(obj.c);
                            } else {
                                calc.push(obj.c);
                            }
                        }
                    }
                }


                calc = calc.concat(atEnd);

                utilPDate.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$", 'i');
                utilPDate.parseFunctions[format] = Ext.functionFactory("input", "strict", xf(code, regexNum, calc.join('')));
            };
        }()),
        // private
        parseCodes: {
            /*
            * Notes:
            * g = {Number} calculation group (0 or 1. only group 1 contributes to date calculations.)
            * c = {String} calculation method (required for group 1. null for group 0. {0} = currentGroup - position in regex result array)
            * s = {String} regex pattern. all matches are stored in results[], and are accessible by the calculation mapped to 'c'
            */
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|0[1-9])" // day of month with leading zeroes (01 - 31)
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(3[0-1]|[1-2][0-9]|[1-9])" // day of month without leading zeroes (1 - 31)
            },
            D: function () {
                for (var a = [], i = 0; i < 7; a.push(utilPDate.getShortDayName(i)), ++i); // get localised short day names
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + a.join("|") + ")"
                };
            },
            l: function () {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + utilPDate.dayNames.join("|") + ")"
                };
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]" // ISO-8601 day number (1 (monday) - 7 (sunday))
            },
            //<locale type="object" property="parseCodes">
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            //</locale>
            w: {
                g: 0,
                c: null,
                s: "[0-6]" // javascript day number (0 (sunday) - 6 (saturday))
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})" // day of the year (0 - 364 (365 in leap years))
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})" // ISO-8601 week number (with leading zero)
            },
            F: function () {
                return {
                    g: 1,
                    c: "m = parseInt(Ext.PDate.getMonthNumber(results[{0}]), 10);\n", // get localised month number
                    s: "(" + utilPDate.monthNames.join("|") + ")"
                };
            },
            M: function () {
                for (var a = [], i = 0; i < 12; a.push(utilPDate.getShortMonthName(i)), ++i); // get localised short month names
                return Ext.applyIf({
                    s: "(" + a.join("|") + ")"
                }, utilPDate.formatCodeToRegex("F"));
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|0[1-9])" // month number with leading zeros (01 - 12)
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(1[0-2]|[1-9])" // month number without leading zeros (1 - 12)
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})" // no. of days in the month (28 - 31)
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function () {
                return utilPDate.formatCodeToRegex("Y");
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})" // 4-digit year
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\n"
				+ "y = ty > Ext.PDate.y2kYear ? 1300 + ty : 1400 + ty;\n", // 2-digit year
                s: "(\\d{1,2})"
            },
            /*
            * In the am/pm parsing routines, we allow both upper and lower case
            * even though it doesn't exactly match the spec. It gives much more flexibility
            * in being able to specify case insensitive regexes.
            */
            //<locale type="object" property="parseCodes">
            a: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\n"
				+ "if (!h || h == 12) { h = 0; }\n"
				+ "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(am|pm|AM|PM)",
                calcAtEnd: true
            },
            //</locale>
            //<locale type="object" property="parseCodes">
            A: {
                g: 1,
                c: "if (/(am)/i.test(results[{0}])) {\n"
				+ "if (!h || h == 12) { h = 0; }\n"
				+ "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM|am|pm)",
                calcAtEnd: true
            },
            //</locale>
            g: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|[0-9])" //  12-hr format of an hour without leading zeroes (1 - 12)
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|1[0-9]|[0-9])" // 24-hr format of an hour without leading zeroes (0 - 23)
            },
            h: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(1[0-2]|0[1-9])" //  12-hr format of an hour with leading zeroes (01 - 12)
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(2[0-3]|[0-1][0-9])" //  24-hr format of an hour with leading zeroes (00 - 23)
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "([0-5][0-9])" // minutes with leading zeros (00 - 59)
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})" // seconds with leading zeros (00 - 59)
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)" // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
            },
            O: {
                g: 1,
                c: [
				"o = results[{0}];",
				"var sn = o.substring(0,1),", // get + / - sign
				"hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
				"mn = o.substring(3,5) % 60;", // get minutes
				"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+-]\\d{4})" // GMT offset in hrs and mins
            },
            P: {
                g: 1,
                c: [
				"o = results[{0}];",
				"var sn = o.substring(0,1),", // get + / - sign
				"hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
				"mn = o.substring(4,6) % 60;", // get minutes
				"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}" // timezone abbrev. may be between 1 - 4 chars
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\n" // -43200 <= UTC offset <= 50400
				+ "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+\-]?\\d{1,5})" // leading '+' sign is optional for UTC offset
            },
            c: function () {
                var calc = [],
				arr = [
				utilPDate.formatCodeToRegex("Y", 1), // year
				utilPDate.formatCodeToRegex("m", 2), // month
				utilPDate.formatCodeToRegex("d", 3), // day
				utilPDate.formatCodeToRegex("H", 4), // hour
				utilPDate.formatCodeToRegex("i", 5), // minute
				utilPDate.formatCodeToRegex("s", 6), // second
				{
				    c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
				}, // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
				{
				    c: [ // allow either "Z" (i.e. UTC) or "-0530" or "+08:00" (i.e. UTC offset) timezone delimiters. assumes local timezone if no timezone is specified
                        "if(results[8]) {", // timezone specified
                        "if(results[8] == 'Z'){",
                        "zz = 0;", // UTC
                        "}else if (results[8].indexOf(':') > -1){",
                        utilPDate.formatCodeToRegex("P", 8).c, // timezone offset with colon separator
                        "}else{",
                        utilPDate.formatCodeToRegex("O", 8).c, // timezone offset without colon separator
                        "}",
                        "}"
				    ].join('\n')
				}
				],
                i,
                l;

                for (i = 0, l = arr.length; i < l; ++i) {
                    calc.push(arr[i].c);
                }

                return {
                    g: 1,
                    c: calc.join(""),
                    s: [
					arr[0].s, // year (required)
					"(?:", "-", arr[1].s, // month (optional)
					"(?:", "-", arr[2].s, // day (optional)
					"(?:",
					"(?:T| )?", // time delimiter -- either a "T" or a single blank space
					arr[3].s, ":", arr[4].s,  // hour AND minute, delimited by a single colon (optional). MUST be preceded by either a "T" or a single blank space
					"(?::", arr[5].s, ")?", // seconds (optional)
					"(?:(?:\\.|,)(\\d+))?", // decimal fraction of a second (e.g. ",12345" or ".98765") (optional)
					"(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", // "Z" (UTC) or "-0530" (UTC offset without colon delimiter) or "+08:00" (UTC offset with colon delimiter) (optional)
					")?",
					")?",
					")?"
                    ].join("")
                };
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch
            }
        },

        //Old Ext.PDate prototype methods.
        // private
        dateFormat: function (date, format) {
            return utilPDate.format(date, format);
        },

        /**
        * Compares if two dates are equal by comparing their values.
        * @param {Date} date1
        * @param {Date} date2
        * @return {Boolean} True if the date values are equal
        */
        isEqual: Ext.Date.isEqual,

        /**
        * Formats a date given the supplied format string.
        * @param {Date} date The date to format
        * @param {String} format The format string
        * @return {String} The formatted date or an empty string if date parameter is not a JavaScript Date object
        */
        format: function (date, format) {
            var formatFunctions = utilPDate.formatFunctions;

            if (!Ext.isDate(date)) {
                return '';
            }

            if (formatFunctions[format] == null) {
                utilPDate.createFormat(format);
            }

            return formatFunctions[format].call(date) + '';
        },
        /**
        * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
        *
        * Note: The date string returned by the javascript Date object's toString() method varies
        * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
        * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
        * getTimezone() first tries to get the timezone abbreviation from between a pair of parentheses
        * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
        * from the GMT offset portion of the date string.
        * @param {Date} date The date
        * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
        */
        getTimezone: Ext.Date.getTimezone,

        /**
        * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
        * @param {Date} date The date
        * @param {Boolean} colon (optional) true to separate the hours and minutes with a colon (defaults to false).
        * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
        */
        getGMTOffset: Ext.Date.getGMTOffset,

        /**
        * Get the numeric day number of the year, adjusted for leap year.
        * @param {Date} date The date
        * @return {Number} 0 to 364 (365 in leap years).
        */
        getDayOfYear: function (date) {
            var num = 0,
			d = Ext.PDate.clone(date),
			m = Ext.PDate.getMonth(date),
			i;

            for (i = 0, utilPDate.setDate(d, 1), utilPDate.setMonth(d, 0) ; i < m; utilPDate.setMonth(d, ++i)) {
                num += utilPDate.getDaysInMonth(d);
            }
            return num + Ext.PDate.getDate(date) - 1;
        },
        /**
        * Get the numeric ISO-8601 week number of the year.
        * (equivalent to the format specifier 'W', but without a leading zero).
        * @param {Date} date The date
        * @return {Number} 1 to 53
        * @method
        */
        getWeekOfYear: function (date) {
            var days = Ext.PDate.getDayOfYear(date);
            return Math.ceil(days / 7);
        },
        /**
        * Checks if the current date falls within a leap year.
        * @param {Date} date The date
        * @return {Boolean} True if the current date falls within a leap year, false otherwise.
        */
        isLeapYear: function (date) {
            var year = Ext.PDate.getFullYear(date),
			mod = year % 33;
            return !!(mod == 1 || mod == 5 || mod == 9 || mod == 13 || mod == 17 || mod == 22 || mod == 26 || mod == 30);
        },
        /**
        * Get the first day of the current month, adjusted for leap year.  The returned value
        * is the numeric day index within the week (0-6) which can be used in conjunction with
        * the {@link #monthNames} array to retrieve the textual day name.
        * Example:
        * <pre><code>
        var dt = new Date('1/10/2007'),
        firstDay = Ext.PDate.getFirstDayOfMonth(dt);
        console.log(Ext.PDate.dayNames[firstDay]); //output: 'Monday'
        * </code></pre>
        * @param {Date} date The date
        * @return {Number} The day number (0-6).
        */
        getFirstDayOfMonth: function (date) {
            utilPDate.getFirstDateOfMonth(date).getDay();
        },
        /**
        * Get the last day of the current month, adjusted for leap year.  The returned value
        * is the numeric day index within the week (0-6) which can be used in conjunction with
        * the {@link #monthNames} array to retrieve the textual day name.
        * Example:
        * <pre><code>
        var dt = new Date('1/10/2007'),
        lastDay = Ext.PDate.getLastDayOfMonth(dt);
        console.log(Ext.PDate.dayNames[lastDay]); //output: 'Wednesday'
        * </code></pre>
        * @param {Date} date The date
        * @return {Number} The day number (0-6).
        */
        getLastDayOfMonth: function (date) {
            return utilPDate.getLastDateOfMonth(date).getDay();
        },
        /**
        * Get the date of the first day of the month in which this date resides.
        * @param {Date} date The date
        * @return {Date}
        */
        getFirstDateOfMonth: function (date) {
            var c = Ext.PDate.clone(date);
            Ext.PDate.setDate(c, 1);
            return c;
        },
        /**
        * Get the date of the last day of the month in which this date resides.
        * @param {Date} date The date
        * @return {Date}
        */
        getLastDateOfMonth: function (date) {
            var c = Ext.PDate.clone(date);
            Ext.PDate.setDate(c, utilPDate.getDaysInMonth(date));
            return c;
        },
        /**
        * Get the number of days in the current month, adjusted for leap year.
        * @param {Date} date The date
        * @return {Number} The number of days in the month.
        * @method
        */
        getDaysInMonth: function (date) {
            var m = Ext.PDate.getMonth(date);

            return m == 11 && Ext.PDate.isLeapYear(date) ? 30 : Ext.PDate.j_days_in_month[m];
        },
        /**
        * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
        * @param {Date} date The date
        * @return {String} 'st, 'nd', 'rd' or 'th'.
        */
        //<locale type="function">
        getSuffix: Ext.Date.getSuffix,
        //</locale>

        /**
        * Creates and returns a new Date instance with the exact same date value as the called instance.
        * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
        * variable will also be changed.  When the intention is to create a new variable that will not
        * modify the original instance, you should create a clone.
        *
        * Example of correctly cloning a date:
        * <pre><code>
        //wrong way:
        var orig = new Date('10/1/2006');
        var copy = orig;
        copy.setDate(5);
        console.log(orig);  //returns 'Thu Oct 05 2006'!

        //correct way:
        var orig = new Date('10/1/2006'),
        copy = Ext.PDate.clone(orig);
        copy.setDate(5);
        console.log(orig);  //returns 'Thu Oct 01 2006'
        * </code></pre>
        * @param {Date} date The date
        * @return {Date} The new Date instance.
        */
        clone: Ext.Date.clone,

        /**
        * Checks if the current date is affected by Daylight Saving Time (DST).
        * @param {Date} date The date
        * @return {Boolean} True if the current date is affected by DST.
        */
        isDST: Ext.Date.isDST,

        /**
        * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
        * automatically adjusting for Daylight Saving Time (DST) where applicable.
        * (note: DST timezone information for the browser's host operating system is assumed to be up-to-date)
        * @param {Date} date The date
        * @param {Boolean} clone true to create a clone of this date, clear the time and return it (defaults to false).
        * @return {Date} this or the clone.
        */
        clearTime: Ext.Date.clearTime,

        /**
        * Provides a convenient method for performing basic date arithmetic. This method
        * does not modify the Date instance being called - it creates and returns
        * a new Date instance containing the resulting date value.
        *
        * Examples:
        * <pre><code>
        // Basic usage:
        var dt = Ext.PDate.add(new Date('10/29/2006'), Ext.PDate.DAY, 5);
        console.log(dt); //returns 'Fri Nov 03 2006 00:00:00'

        // Negative values will be subtracted:
        var dt2 = Ext.PDate.add(new Date('10/1/2006'), Ext.Date.DAY, -5);
        console.log(dt2); //returns 'Tue Sep 26 2006 00:00:00'

        * </code></pre>
        *
        * @param {Date} date The date to modify
        * @param {String} interval A valid date interval enum value.
        * @param {Number} value The amount to add to the current date.
        * @return {Date} The new Date instance.
        */
        add: function (date, interval, value) {
            var d = Ext.PDate.clone(date),
				day;
            if (!interval || value === 0) {
                return d;
            }

            switch (interval.toLowerCase()) {
                case Ext.Date.MILLI:
                    d.setMilliseconds(d.getMilliseconds() + value);
                    break;
                case Ext.Date.SECOND:
                    d.setSeconds(d.getSeconds() + value);
                    break;
                case Ext.Date.MINUTE:
                    d.setMinutes(d.getMinutes() + value);
                    break;
                case Ext.Date.HOUR:
                    d.setHours(d.getHours() + value);
                    break;
                case Ext.Date.DAY:
                    d.setDate(d.getDate() + value);
                    break;
                case Ext.Date.MONTH:
                    day = Ext.PDate.getDate(d);
                    if (day > 29) {
                        day = Math.min(day, Ext.PDate.getLastDateOfMonth(Ext.PDate.add(Ext.PDate.getFirstDateOfMonth(d), Ext.Date.MONTH, value)).getDate());
                    }
                    Ext.PDate.setDate(d, day);
                    Ext.PDate.setMonth(d, Ext.PDate.getMonth(d) + value);
                    break;
                case Ext.Date.YEAR:
                    day = Ext.PDate.getDate(d);
                    if (day > 29) {
                        day = Math.min(day, Ext.PDate.getLastDateOfMonth(Ext.PDate.add(Ext.PDate.getFirstDateOfMonth(d), Ext.Date.YEAR, value)).getDate());
                    }
                    Ext.PDate.setDate(d, day);
                    Ext.PDate.setFullYear(d, Ext.PDate.getFullYear(d) + value);
                    break;
            }
            return d;
        },
        /**
        * Checks if a date falls on or between the given start and end dates.
        * @param {Date} date The date to check
        * @param {Date} start Start date
        * @param {Date} end End date
        * @return {Boolean} true if this date falls on or between the given start and end dates.
        */
        between: Ext.Date.between
    };

    var utilPDate = Ext.PDate;

}());

/**
* @private
* @class Ext.picker.Month
* @extends Ext.Component
* <p>A month picker component. This class is used by the {@link Ext.picker.Date DatePicker} class
* to allow browsing and selection of year/months combinations.</p>
*/
Ext.define('Ext.picker.PMonth', {
    extend: 'Ext.picker.Month',
    requires: ['Ext.PDate'],
    alias: 'widget.pmonthpicker',
    alternateClassName: 'Ext.PMonthPicker',
    // private, inherit docs
    initComponent: function () {
        var me = this;
        this.callParent();
        me.activeYear = me.getYear(Ext.PDate.getFullYear(new Date()) - 4, -4);
    },
    okText: 'تایید',
    cancelText: 'لغو',

    // private, inherit docs
    beforeRender: function (ct, position) {

        var me = this,
            i = 0,
            months = [],
            shortName = Ext.PDate.getShortMonthName,
            monthLen = me.monthOffset,
            margin = me.monthMargin,
            style = '';

        me.callParent();

        for (; i < monthLen; ++i) {
            months.push(shortName(i), shortName(i + monthLen));
        }

        if (Ext.isDefined(margin)) {
            style = 'margin: 0 ' + margin + 'px;';
        }

        Ext.apply(me.renderData, {
            months: months,
            years: me.getYears(),
            showButtons: me.showButtons,
            monthStyle: style
        });

        Ext.picker.Month.superclass.beforeRender.apply(this, arguments);
    },
    /**
    * Set the value for the picker.
    * @param {Date/Array} value The value to set. It can be a Date object, where the month/year will be extracted, or
    * it can be an array, with the month as the first index and the year as the second.
    * @return {Ext.picker.Month} this
    */
    setValue: function (value) {
        var me = this,
		active = me.activeYear,
		offset = me.monthOffset,
		year,
		index;

        if (!value) {
            me.value = [null, null];
        } else if (Ext.isDate(value)) {
            me.value = [Ext.PDate.getMonth(value), Ext.PDate.getFullYear(value)];
        } else {
            me.value = [value[0], value[1]];
        }

        if (me.rendered) {
            year = me.value[1];
            if (year !== null) {
                if ((year < active || year > active + me.yearOffset)) {
                    me.activeYear = year - me.yearOffset + 1;
                }
            }
            me.updateBody();
        }

        return me;
    }
});

/**
* @class Ext.picker.Date
* @extends Ext.Component
* <p>A date picker. This class is used by the {@link Ext.form.field.Date} field to allow browsing and
* selection of valid dates in a popup next to the field, but may also be used with other components.</p>
* <p>Typically you will need to implement a handler function to be notified when the user chooses a color from the
* picker; you can register the handler using the {@link #select} event, or by implementing the {@link #handler}
* method.</p>
* <p>By default the user will be allowed to pick any date; this can be changed by using the {@link #minDate},
* {@link #maxDate}, {@link #disabledDays}, {@link #disabledDatesRE}, and/or {@link #disabledDates} configs.</p>
* <p>All the string values documented below may be overridden by including an Ext locale file in your page.</p>
* <p>Example usage:</p>
* <pre><code>new Ext.panel.Panel({
title: 'Choose a future date:',
width: 200,
bodyPadding: 10,
renderTo: Ext.getBody(),
items: [{
xtype: 'datepicker',
minDate: new Date(),
handler: function(picker, date) {
// do something with the selected date
}
}]
});</code></pre>
* {@img Ext.picker.Date/Ext.picker.Date.png Ext.picker.Date component}
*
*/
Ext.define('Ext.picker.PDate', {
    extend: 'Ext.picker.Date',
    alias: 'widget.pdatepicker',
    alternateClassName: 'Ext.PDatePicker',
    requires: ['Ext.picker.PMonth'],
    ariaTitle: 'تاریخ انتخاب شده: {0}',
    ariaTitleDateFormat: 'd F Y',
    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
            '<div role="presentation" class="{baseCls}-header">',
                '<div class="{baseCls}-prev"><a id="{id}-prevEl" href="#" role="button" title="{prevText}"></a></div>',
                '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
                '<div class="{baseCls}-next"><a id="{id}-nextEl" href="#" role="button" title="{nextText}"></a></div>',
            '</div>',
            '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="presentation">',
                '<thead role="presentation"><tr role="presentation">',
                    '<tpl for="dayNames">',
                        '<th role="columnheader" title="{.}"><span>{.:this.firstInitial}</span></th>',
                    '</tpl>',
                '</tr></thead>',
                '<tbody role="presentation"><tr role="presentation">',
                    '<tpl for="days">',
                        '{#:this.isEndOfWeek}',
                        '<td role="gridcell" id="{[Ext.id()]}">',
                            '<a role="presentation" href="#" hidefocus="on" class="{parent.baseCls}-date" tabIndex="1">',
                                '<em role="presentation"><span role="presentation"></span></em>',
                            '</a>',
                        '</td>',
                    '</tpl>',
                '</tr></tbody>',
            '</table>',
            '<tpl if="showToday">',
                '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
        '</div>',
        {
            firstInitial: function (value) {
                return Ext.picker.PDate.prototype.getDayInitial(value);
            },
            isEndOfWeek: function (value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function (values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],

    /**
    * @cfg {Number} startDay
    * Day index at which the week should begin, 0-based (defaults to 6, which is Sunday)
    */
    //<locale>
    startDay: 0,
    //</locale>



    // private, inherit docs
    initEvents: function () {
        var me = this,
            eDate = Ext.PDate,
            day = eDate.DAY;

        Ext.picker.Date.superclass.initEvents.call(this);

        me.prevRepeater = new Ext.util.ClickRepeater(me.prevEl, {
            handler: me.showPrevMonth,
            scope: me,
            preventDefault: true,
            stopDefault: true
        });

        me.nextRepeater = new Ext.util.ClickRepeater(me.nextEl, {
            handler: me.showNextMonth,
            scope: me,
            preventDefault: true,
            stopDefault: true
        });

        me.keyNav = new Ext.util.KeyNav(me.eventEl, Ext.apply({
            scope: me,
            left: function (e) {
                if (e.ctrlKey) {
                    me.showPrevMonth();
                } else {
                    me.update(eDate.add(me.activeDate, day, -1));
                }
            },

            right: function (e) {
                if (e.ctrlKey) {
                    me.showNextMonth();
                } else {
                    me.update(eDate.add(me.activeDate, day, 1));
                }
            },

            up: function (e) {
                if (e.ctrlKey) {
                    me.showNextYear();
                } else {
                    me.update(eDate.add(me.activeDate, day, -7));
                }
            },

            down: function (e) {
                if (e.ctrlKey) {
                    me.showPrevYear();
                } else {
                    me.update(eDate.add(me.activeDate, day, 7));
                }
            },
            pageUp: me.showNextMonth,
            pageDown: me.showPrevMonth,
            enter: function (e) {
                e.stopPropagation();
                return true;
            }
        }, me.keyNavConfig));

        if (me.showToday) {
            me.todayKeyListener = me.eventEl.addKeyListener(Ext.EventObject.SPACE, me.selectToday, me);
        }
        me.update(me.value);
    },

    /**
    * Setup the disabled dates regex based on config options
    * @private
    */
    initDisabledDays: function () {
        var me = this,
            dd = me.disabledDates,
            re = '(?:',
            len,
            d, dLen, dI;

        if (!me.disabledDatesRE && dd) {
            len = dd.length - 1;

            dLen = dd.length;

            for (d = 0; d < dLen; d++) {
                dI = dd[d];

                re += Ext.isDate(dI) ? '^' + Ext.String.escapeRegex(Ext.PDate.dateFormat(dI, me.format)) + '$' : dI;
                if (d != len) {
                    re += '|';
                }
            }

            me.disabledDatesRE = new RegExp(re + ')');
        }
    },

    /**
    * Create the month picker instance
    * @private
    * @return {Ext.picker.Month} picker
    */
    createMonthPicker: function () {
        var me = this,
            picker = me.monthPicker;

        if (!picker) {
            me.monthPicker = picker = new Ext.picker.PMonth({
                renderTo: me.el,
                floating: true,
                shadow: false,
                small: me.showToday === false,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            });
            if (!me.disableAnim) {
                // hide the element if we're animating to prevent an initial flicker
                picker.el.setStyle('display', 'none');
            }
            me.on('beforehide', Ext.Function.bind(me.hideMonthPicker, me, [false]));
        }
        return picker;
    },

    /**
    * Respond to an ok click on the month picker
    * @private
    */
    onOkClick: function (picker, value) {
        var me = this,
            month = value[0] + 1,
            year = value[1],
            gd = Ext.PDate.PersianToGregorian(year, month, Ext.PDate.getDate(me.getActive())),
            date = new Date(gd[0], gd[1] - 1, gd[2]);
        /*
        if (date.getMonth() !== month) {
        // 'fix' the JS rolling date conversion if needed
        date = new Date(year, month, 1).getLastDateOfMonth();
        }
        */
        me.update(date);
        me.hideMonthPicker();
    },

    /**
    * Show the previous month.
    * @return {Ext.picker.Date} this
    */
    showPrevMonth: function (e) {
        return this.update(Ext.PDate.add(this.activeDate, Ext.Date.MONTH, -1));
    },

    /**
    * Show the next month.
    * @return {Ext.picker.Date} this
    */
    showNextMonth: function (e) {
        return this.update(Ext.PDate.add(this.activeDate, Ext.Date.MONTH, 1));
    },

    /**
    * Show the previous year.
    * @return {Ext.picker.Date} this
    */
    showPrevYear: function () {
        this.update(Ext.PDate.add(this.activeDate, Ext.Date.YEAR, -1));
    },

    /**
    * Show the next year.
    * @return {Ext.picker.Date} this
    */
    showNextYear: function () {
        this.update(Ext.PDate.add(this.activeDate, Ext.Date.YEAR, 1));
    },

    /**
    * Update the contents of the picker
    * @private
    * @param {Date} date The new date
    * @param {Boolean} forceRefresh True to force a full refresh
    */
    update: function (date, forceRefresh) {
        var me = this,
            active = me.activeDate;

        if (me.rendered) {
            me.activeDate = date;
            if (!forceRefresh && active && me.el && Ext.PDate.getMonth(active) == Ext.PDate.getMonth(date) && Ext.PDate.getFullYear(active) == Ext.PDate.getFullYear(date)) {
                me.selectedUpdate(date, active);
            } else {
                me.fullUpdate(date, active);
            }
            me.innerEl.dom.title = Ext.String.format(me.ariaTitle, Ext.PDate.format(me.activeDate, me.ariaTitleDateFormat));
        }
        return me;
    },

    /**
    * Update the contents of the picker for a new month
    * @private
    * @param {Date} date The new date
    */
    fullUpdate: function (date) {

        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.PDate,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            sel = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value,
            gm;

        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        //current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);
        current = eDate.clone(previousMonth);
        current = eDate.clearTime(current);
        eDate.setDate(current, prevStart);
        current.setHours(me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function (cell) {
            value = +eDate.clearTime(current, true);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            if (value == today) {
                cell.className += ' ' + me.todayCls;
                cell.title = me.todayText;
            }
            if (value == sel) {
                cell.className += ' ' + me.selectedCls;
                me.fireEvent('highlightitem', me, cell);
                if (visible && me.floating) {
                    Ext.fly(cell.firstChild).focus(50);
                }
            }
            // disabling
            if (value < min) {
                cell.className = disabledCls;
                cell.title = me.minText;
                return;
            }
            if (value > max) {
                cell.className = disabledCls;
                cell.title = me.maxText;
                return;
            }
            if (ddays) {
                if (ddays.indexOf(current.getDay()) != -1) {
                    cell.title = ddaysText;
                    cell.className = disabledCls;
                }
            }
            if (ddMatch && format) {
                formatValue = eDate.dateFormat(current, format);
                if (ddMatch.test(formatValue)) {
                    cell.title = ddText.replace('%0', formatValue);
                    cell.className = disabledCls;
                }
            }
        };

        for (; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            cells[i].className = cls;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i]);
        }

        me.monthBtn.setText(Ext.PDate.format(date, me.monthYearFormat));
    }

},

// After dependencies have loaded:
function () {
    var proto = this.prototype,
        date = Ext.PDate;

    proto.monthNames = date.monthNames;
    proto.dayNames = date.dayNames;
    proto.format = date.defaultFormat;
});



Ext.data.Types.PDATE = {
    convert: function (v) {
        var df = this.dateFormat;
        if (!v) {
            return null;
        }
        if (Ext.isDate(v)) {
            return v;
        }
        if (df) {
            if (df == 'timestamp') {
                return new Date(v * 1000);
            }
            if (df == 'time') {
                return new Date(parseInt(v, 10));
            }
            return Ext.PDate.parse(v, df);
        }

        var parsed = Date.parse(v);
        return parsed ? new Date(parsed) : null;
    },
    sortType: Ext.data.SortTypes.asDate,
    type: 'pdate'
}
Ext.util.Format.pdate = function (v, format) {
    if (!v) {
        return "";
    }
    if (!Ext.isDate(v)) {
        v = new Date(Date.parse(v));
    }
    return Ext.PDate.dateFormat(v, format || Ext.PDate.defaultFormat);
};
Ext.util.Format.pdateRenderer = function (format) {
    return function (v) {
        return UtilFormat.date(v, format);
    }
}




/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
* @class Ext.menu.DatePicker
* @extends Ext.menu.Menu
* <p>A menu containing an {@link Ext.picker.Date} Component.</p>
* <p>Notes:</p><div class="mdetail-params"><ul>
* <li>Although not listed here, the <b>constructor</b> for this class
* accepts all of the configuration options of <b>{@link Ext.picker.Date}</b>.</li>
* <li>If subclassing DateMenu, any configuration options for the DatePicker must be
* applied to the <tt><b>initialConfig</b></tt> property of the DateMenu.
* Applying {@link Ext.picker.Date DatePicker} configuration settings to
* <b><tt>this</tt></b> will <b>not</b> affect the DatePicker's configuration.</li>
* </ul></div>
*
* {@img Ext.menu.DatePicker/Ext.menu.DatePicker.png Ext.menu.DatePicker component}
*
* __Example Usage__
*
*     var dateMenu = Ext.create('Ext.menu.DatePicker', {
*         handler: function(dp, date){
*             Ext.Msg.alert('Date Selected', 'You choose {0}.', Ext.Date.format(date, 'M j, Y'));
*         }
*     });
*  
*     Ext.create('Ext.menu.Menu', {
*         width: 100,
*         height: 90,
*         floating: false,  // usually you want this set to True (default)
*         renderTo: Ext.getBody(),  // usually rendered by it's containing component
*         items: [{
*             text: 'choose a date',
*             menu: dateMenu
*         },{
*             iconCls: 'add16',
*             text: 'icon item'
*         },{
*             text: 'regular item'
*         }]
*     });
*
* @author Nicolas Ferrero
*/
Ext.define('Ext.menu.PDatePicker', {
    extend: 'Ext.menu.Menu',

    alias: 'widget.pdatemenu',

    requires: [
        'Ext.picker.PDate'
    ],

    /**
    * @cfg {Boolean} hideOnClick
    * False to continue showing the menu after a date is selected, defaults to true.
    */
    hideOnClick: true,

    /**
    * @cfg {String} pickerId
    * An id to assign to the underlying date picker. Defaults to <tt>null</tt>.
    */
    pickerId: null,

    /**
    * @cfg {Number} maxHeight
    * @private
    */

    /**
    * The {@link Ext.picker.Date} instance for this DateMenu
    * @property picker
    * @type Ext.picker.Date
    */

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            showSeparator: false,
            plain: true,
            border: false,
            bodyPadding: 0, // remove the body padding from the datepicker menu item so it looks like 3.3
            items: Ext.applyIf({
                cls: Ext.baseCSSPrefix + 'menu-date-item',
                id: me.pickerId,
                xtype: 'pdatepicker'
            }, me.initialConfig)
        });

        me.callParent(arguments);

        me.picker = me.down('pdatepicker');
        /**
        * @event select
        * @inheritdoc Ext.picker.Date#select
        */
        me.relayEvents(me.picker, ['select']);

        if (me.hideOnClick) {
            me.on('select', me.hidePickerOnSelect, me);
        }
    },

    hidePickerOnSelect: function () {
        Ext.menu.Manager.hideAll();
    }
});

/**
* @class Ext.form.field.Date
* @extends Ext.form.field.Picker

Provides a date input field with a {@link Ext.picker.Date date picker} dropdown and automatic date
validation.

This field recognizes and uses the JavaScript Date object as its main {@link #value} type. In addition,
it recognizes string values which are parsed according to the {@link #format} and/or {@link #altFormats}
configs. These may be reconfigured to use date formats appropriate for the user's locale.

The field may be limited to a certain range of dates by using the {@link #minValue}, {@link #maxValue},
{@link #disabledDays}, and {@link #disabledDates} config parameters. These configurations will be used both
in the field's validation, and in the date picker dropdown by preventing invalid dates from being selected.
{@img Ext.form.Date/Ext.form.Date.png Ext.form.Date component}
#Example usage:#

Ext.create('Ext.form.Panel', {
width: 300,
bodyPadding: 10,
title: 'Dates',
items: [{
xtype: 'datefield',
anchor: '100%',
fieldLabel: 'From',
name: 'from_date',
maxValue: new Date()  // limited to the current date or prior
}, {
xtype: 'datefield',
anchor: '100%',
fieldLabel: 'To',
name: 'to_date',
value: new Date()  // defaults to today
}],
renderTo: Ext.getBody()
});

#Date Formats Examples#

This example shows a couple of different date format parsing scenarios. Both use custom date format
configurations; the first one matches the configured `format` while the second matches the `altFormats`.

Ext.create('Ext.form.Panel', {
renderTo: Ext.getBody(),
width: 300,
bodyPadding: 10,
title: 'Dates',
items: [{
xtype: 'datefield',
anchor: '100%',
fieldLabel: 'Date',
name: 'date',
// The value matches the format; will be parsed and displayed using that format.
format: 'm d Y',
value: '2 4 1978'
}, {
xtype: 'datefield',
anchor: '100%',
fieldLabel: 'Date',
name: 'date',
// The value does not match the format, but does match an altFormat; will be parsed
// using the altFormat and displayed using the format.
format: 'm d Y',
altFormats: 'm,d,Y|m.d.Y',
value: '2.4.1978'
}]
});

* 
* @markdown
* @docauthor Jason Johnston <jason@sencha.com>
*/
Ext.define('Ext.form.field.PDate', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.pdatefield',
    requires: ['Ext.picker.PDate'],
    alternateClassName: ['Ext.form.PDateField', 'Ext.form.PDate'],

    //<locale>
    format: "Y/m/d",
    //</locale>
    startDay: 6,

    /**
    * Sets the value of the date field.  You can pass a date object or any string that can be
    * parsed into a valid date, using <tt>{@link #format}</tt> as the date format, according
    * to the same rules as {@link Ext.Date#parse} (the default format used is <tt>"m/d/Y"</tt>).
    * <br />Usage:
    * <pre><code>
    //All of these calls set the same date value (May 4, 2006)

    //Pass a date object:
    var dt = new Date('5/4/2006');
    dateField.setValue(dt);

    //Pass a date string (default format):
    dateField.setValue('05/04/2006');

    //Pass a date string (custom format):
    dateField.format = 'Y-m-d';
    dateField.setValue('2006-05-04');
    </code></pre>
    * @param {String/Date} date The date or valid date string
    * @return {Ext.form.field.Date} this
    * @method setValue
    */

    /**
    * Attempts to parse a given string value using a given {@link Ext.Date#parse date format}.
    * @param {String} value The value to attempt to parse
    * @param {String} format A valid date format (see {@link Ext.Date#parse})
    * @return {Date} The parsed Date object, or null if the value could not be successfully parsed.
    */
    safeParse: function (value, format) {
        var me = this,
            utilDate = Ext.PDate,
            parsedDate,
            result = null,
            strict = me.useStrict,
            parsedDate;


        if (utilDate.formatContainsHourInfo(format)) {
            // if parse format contains hour information, no DST adjustment is necessary
            result = utilDate.parse(value, format, strict);
        } else {
            // set time to 12 noon, then clear the time
            parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat, strict);
            if (parsedDate) {
                result = utilDate.clearTime(parsedDate);
            }
        }
        return result;
    },

    // @private
    getSubmitValue: function () {
        var me = this,
            format = me.submitFormat || me.format,
            value = me.getValue();

        return value ? Ext.PDate.format(value, format) : '';
    },



    // private
    formatDate: function (date) {
        return Ext.isDate(date) ? Ext.PDate.dateFormat(date, this.format) : date;
    },

    createPicker: function () {
        var me = this,
            format = Ext.String.format;

        return new Ext.picker.PDate({
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
    }
});

