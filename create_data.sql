\i data/starter/schema.sql
\i create_views.sql

\copy (select * from animal_facts) to 'data/animal_facts.csv' delimiter ',' csv header;
\copy (select * from animal_weight) to 'data/animal_weight.csv' delimiter ',' csv header;
\copy (select * from animal_trait) to 'data/animal_trait.csv' delimiter ',' csv header;
\copy (select * from animal_weight) to 'data/animal_weight.csv' delimiter ',' csv header;
\copy (select * from pick) to 'data/pick.csv' delimiter ',' csv header;
