var host = "https://api-newsletter.byets.org"; 
var hostCB = "https://api-newsletter.byets.org";

module.exports = { 
    V1API : {
        'getAccessToken': host+'/api/auth/token',
        'refreshAccessToken':host+'/api/authentication/token/refresh',
        'verifyLogin':host+'/api/auth/token/verify',

        'create_content':host+'/api/content/create',
        'fetch_content':host+'/api/content/list',
        'fetch_content_without_pg':host+'/api/content/',
        'content_delete':host+'/api/content/delete/',

        'create_blog':host+'/api/content/blog/create',
        'fetch_blog':host+'/api/content/blog/list',
        'fetch_blog_without_pg':host+'/api/content/blog',
        'blog_delete':host+'/api/content/blog/delete/',

        'create_settings':host+'/api/content/settings/edit',
        'fetch_settings':host+'/api/content/settings',

        'create_layout':host+'/api/content/layout/create',
        'fetch_layout':host+'/api/content/layout/list',
        'layout_delete':host+'/api/content/layout/delete/',
        'layout_details':host+'/api/content/layout/detail/',
        'layout_edit':host+'/api/content/layout/update/',
        'toggle_layout':host+'/api/content/layout/toggle-status/',
        'fetch_users_by_status':host+'/api/content/layout/list/by-published/',

        'create_layout_draft':host+'/api/content/draft/create',
        'get_layout_draft':host+'/api/content/draft',
        'draft_delete':host+'/api/content/draft/delete/',

        'send_mail':host+'/api/newsletter/send-mail',
    }
};
