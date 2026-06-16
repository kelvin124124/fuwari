import I18nKey from "./i18nKey";

// ponytail: single-language map. Add a languages/ dir + locale switch only if the blog goes multilingual.
const en: Record<I18nKey, string> = {
	[I18nKey.home]: "Home",
	[I18nKey.about]: "About",
	[I18nKey.archive]: "Archive",
	[I18nKey.search]: "Search",

	[I18nKey.tags]: "Tags",
	[I18nKey.categories]: "Categories",
	[I18nKey.recentPosts]: "Recent Posts",

	[I18nKey.comments]: "Comments",

	[I18nKey.untitled]: "Untitled",
	[I18nKey.uncategorized]: "Uncategorized",
	[I18nKey.noTags]: "No Tags",

	[I18nKey.wordCount]: "word",
	[I18nKey.wordsCount]: "words",
	[I18nKey.minuteCount]: "minute",
	[I18nKey.minutesCount]: "minutes",
	[I18nKey.postCount]: "post",
	[I18nKey.postsCount]: "posts",

	[I18nKey.themeColor]: "Theme Color",

	[I18nKey.lightMode]: "Light",
	[I18nKey.darkMode]: "Dark",
	[I18nKey.systemMode]: "System",

	[I18nKey.more]: "More",

	[I18nKey.author]: "Author",
	[I18nKey.publishedAt]: "Published at",
	[I18nKey.license]: "License",
};

export function i18n(key: I18nKey): string {
	return en[key];
}
