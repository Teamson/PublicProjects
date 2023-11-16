let moduleMap = {
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'assets/main/index.js' () { return require('assets/main/index.js') },
'assets/internal/config.js' () { return require('assets/internal/config.js'); },
'assets/internal/import/02/0275e94c-56a7-410f-bd1a-fc7483f7d14a.js' () { return require('assets/internal/import/02/0275e94c-56a7-410f-bd1a-fc7483f7d14a.js'); },
'assets/internal/import/14/144c3297-af63-49e8-b8ef-1cfa29b3be28.js' () { return require('assets/internal/import/14/144c3297-af63-49e8-b8ef-1cfa29b3be28.js'); },
'assets/internal/import/28/2874f8dd-416c-4440-81b7-555975426e93.js' () { return require('assets/internal/import/28/2874f8dd-416c-4440-81b7-555975426e93.js'); },
'assets/internal/import/2a/2a296057-247c-4a1c-bbeb-0548b6c98650.js' () { return require('assets/internal/import/2a/2a296057-247c-4a1c-bbeb-0548b6c98650.js'); },
'assets/internal/import/2a/2a7c0036-e0b3-4fe1-8998-89a54b8a2bec.js' () { return require('assets/internal/import/2a/2a7c0036-e0b3-4fe1-8998-89a54b8a2bec.js'); },
'assets/internal/import/30/30682f87-9f0d-4f17-8a44-72863791461b.js' () { return require('assets/internal/import/30/30682f87-9f0d-4f17-8a44-72863791461b.js'); },
'assets/internal/import/3a/3a7bb79f-32fd-422e-ada2-96f518fed422.js' () { return require('assets/internal/import/3a/3a7bb79f-32fd-422e-ada2-96f518fed422.js'); },
'assets/internal/import/46/466d4f9b-e5f4-4ea8-85d5-3c6e9a65658a.js' () { return require('assets/internal/import/46/466d4f9b-e5f4-4ea8-85d5-3c6e9a65658a.js'); },
'assets/internal/import/6d/6d91e591-4ce0-465c-809f-610ec95019c6.js' () { return require('assets/internal/import/6d/6d91e591-4ce0-465c-809f-610ec95019c6.js'); },
'assets/internal/import/6f/6f801092-0c37-4f30-89ef-c8d960825b36.js' () { return require('assets/internal/import/6f/6f801092-0c37-4f30-89ef-c8d960825b36.js'); },
'assets/internal/import/a1/a153945d-2511-4c14-be7b-05d242f47d57.js' () { return require('assets/internal/import/a1/a153945d-2511-4c14-be7b-05d242f47d57.js'); },
'assets/internal/import/c0/c0040c95-c57f-49cd-9cbc-12316b73d0d4.js' () { return require('assets/internal/import/c0/c0040c95-c57f-49cd-9cbc-12316b73d0d4.js'); },
'assets/internal/import/cf/cf7e0bb8-a81c-44a9-ad79-d28d43991032.js' () { return require('assets/internal/import/cf/cf7e0bb8-a81c-44a9-ad79-d28d43991032.js'); },
'assets/internal/import/e0/e02d87d4-e599-4d16-8001-e14891ac6506.js' () { return require('assets/internal/import/e0/e02d87d4-e599-4d16-8001-e14891ac6506.js'); },
'assets/internal/import/ec/eca5d2f2-8ef6-41c2-bbe6-f9c79d09c432.js' () { return require('assets/internal/import/ec/eca5d2f2-8ef6-41c2-bbe6-f9c79d09c432.js'); },
'assets/internal/import/f1/f18742d7-56d2-4eb5-ae49-2d9d710b37c8.js' () { return require('assets/internal/import/f1/f18742d7-56d2-4eb5-ae49-2d9d710b37c8.js'); },
'assets/main/config.js' () { return require('assets/main/config.js'); },
'assets/main/import/04/04094fc0-f9dc-4f48-a0e0-6f7d4264b834.js' () { return require('assets/main/import/04/04094fc0-f9dc-4f48-a0e0-6f7d4264b834.js'); },
'assets/main/import/3b/3bc8e94f-f084-4b62-85f5-e64f2ae0813a.js' () { return require('assets/main/import/3b/3bc8e94f-f084-4b62-85f5-e64f2ae0813a.js'); },
'assets/main/import/41/413f73b4-2552-403e-898c-e64b6922d174.js' () { return require('assets/main/import/41/413f73b4-2552-403e-898c-e64b6922d174.js'); },
'assets/main/import/56/5633ff30-40cb-4250-823b-c31ce58d51cb.js' () { return require('assets/main/import/56/5633ff30-40cb-4250-823b-c31ce58d51cb.js'); },
'assets/main/import/60/600042ee-2e29-4878-b243-ef7a3a58e9b2.js' () { return require('assets/main/import/60/600042ee-2e29-4878-b243-ef7a3a58e9b2.js'); },
'assets/main/import/88/88193714-b9ec-4786-920b-475f82efa394.js' () { return require('assets/main/import/88/88193714-b9ec-4786-920b-475f82efa394.js'); },
'assets/main/import/95/95fa82dc-17e8-4003-86ad-14b4991ed692.js' () { return require('assets/main/import/95/95fa82dc-17e8-4003-86ad-14b4991ed692.js'); },
'assets/main/import/9e/9eb713c8-6d5d-4ea2-99b7-47b7a8dab11e.js' () { return require('assets/main/import/9e/9eb713c8-6d5d-4ea2-99b7-47b7a8dab11e.js'); },
'assets/main/import/b5/b57bd9b9-e344-4d7c-93a4-9458508d152e.js' () { return require('assets/main/import/b5/b57bd9b9-e344-4d7c-93a4-9458508d152e.js'); },
'assets/main/import/c1/c1719dfb-6a1b-4f87-a393-169c9fe1bf16.js' () { return require('assets/main/import/c1/c1719dfb-6a1b-4f87-a393-169c9fe1bf16.js'); },
'assets/main/import/c9/c9b6eb81-48ca-4fa2-b624-c390512d3031.js' () { return require('assets/main/import/c9/c9b6eb81-48ca-4fa2-b624-c390512d3031.js'); },
'assets/main/import/ce/ce253a09-cd1b-46e1-9c04-eaa221d15c3f.js' () { return require('assets/main/import/ce/ce253a09-cd1b-46e1-9c04-eaa221d15c3f.js'); },
'assets/main/import/d1/d17c85c4-e996-4b87-9c33-96084b1b49b9.js' () { return require('assets/main/import/d1/d17c85c4-e996-4b87-9c33-96084b1b49b9.js'); },
'assets/main/import/d2/d20ff890-0b26-4acc-b2f5-eca420b18edb.js' () { return require('assets/main/import/d2/d20ff890-0b26-4acc-b2f5-eca420b18edb.js'); },
'assets/main/import/e1/e14aabf8-8876-4447-82e0-5c885407ceb0.js' () { return require('assets/main/import/e1/e14aabf8-8876-4447-82e0-5c885407ceb0.js'); },
'assets/main/import/eb/eb3c9452-2f67-40bc-834a-f334a9c79930.js' () { return require('assets/main/import/eb/eb3c9452-2f67-40bc-834a-f334a9c79930.js'); },
'assets/main/import/ee/ee1df71b-03bc-4d66-aae6-13aa2a298d11.js' () { return require('assets/main/import/ee/ee1df71b-03bc-4d66-aae6-13aa2a298d11.js'); },
// tail

};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};