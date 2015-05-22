$(function() {
	'use strict';

	var $articleContainer = $('#latestReleaseContainer'),
			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	$.ajax({
	  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent('http://www.group6.co.nz/rss/diva.xml'),
	  dataType : 'json',
	  success  : function (data) {
	    if (data.responseData.feed && data.responseData.feed.entries) {
	      $.each(data.responseData.feed.entries, function (i, e) {
					var $article = $('<article>'),
							$header = $('<header>'),
							pubDate = new Date(e.publishedDate),
							formattedDate = pubDate.getDate() + ' ' + months[pubDate.getMonth()] + ' ' + pubDate.getFullYear();

					$header.append('<h2><a href="' + e.link + '" target="_blank">' + e.title  + '</a><h2>');
					$header.append('<time pubdate datetime="' + pubDate.toISOString() + '">' + formattedDate  + '</time>');
					$header.appendTo($article);
					$article.append(e.content);

					$articleContainer.append($article);
	      });
	    }
	  }
	});
});
