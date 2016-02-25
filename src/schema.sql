-- ---
-- Table 'pins'
-- ---

DROP TABLE IF EXISTS pins;

create table pins(pin varchar(4), id INTEGER PRIMARY KEY AUTOINCREMENT);

-- ---
-- Default Data
-- ---

insert into pins (pin) values ("1111");
insert into pins (pin) values ("2222");
insert into pins (pin) values ("3333");
insert into pins (pin) values ("4444");
