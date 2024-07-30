export default [
    {
        path: '/newsletters',
        name:'newsletters',
        component:()=> import('@/views/pages/cloudx/administration/Newsletters.vue')
    },
    {
        path: '/newsletter/:id',
        name:'newsletters',
        component:()=> import('@/views/pages/cloudx/administration/Newsletter-Details.vue')
    },
    {
        path: '/contents',
        name:'contents',
        component:()=> import('@/views/pages/cloudx/administration/Contents.vue')
    },
    {
        path: '/blogs',
        name:'blogs',
        component:()=> import('@/views/pages/cloudx/administration/Blogs.vue')
    },
    {
        path: '/settings',
        name:'settings',
        component:()=> import('@/views/pages/cloudx/administration/Settings.vue')
    }
]