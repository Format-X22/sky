global.classPath = `${__dirname}/`;

require('./core/Ext');
require('./Main');

Ext.create('Q.Main').init();