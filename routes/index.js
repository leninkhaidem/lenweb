
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('dev', { title: 'Express' });
};