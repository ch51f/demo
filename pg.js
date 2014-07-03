var pg = require("pg");
var constring = "tcp://postgres:198951@localhost/my";
var cons = "postgres://zstywvdauahtkx:4kunAvqNtHIt_-UCNPxE5_KNaj@ec2-50-17-207-54.compute-1.amazonaws.com:5432/dcn343hvjpfro0"

var client = new pg.Client(constring);
client.connect();

exports.Client = client;
// var q = "select schemaname,tablename,tableowner from pg_tables where tablename = 'beatle';"
// client.query("create table bill(id serial PRIMARY KEY, user_id varchar(10),title varchar(10),content varchar(50),bill_flg smallint,money integer,date date)");
// client.query("create table f_user(username varchar(10),password varchar(10),date date)");
// client.query("create table todo(id serial PRIMARY KEY, title varchar(10),time date,t_order serial,done boolean)");

// client.end();
