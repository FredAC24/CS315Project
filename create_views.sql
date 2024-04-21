CREATE OR REPLACE VIEW Animal_facts AS
SELECT AF.animal_id, AF.tag, AF.rfid, AF.dob,AF.sex,AF.breed_date,AF.dam,AF.dam_date
from ANIMAL as AF;

CREATE OR REPLACE VIEW Animal_weight AS
SELECT AW.animal_id, AW.last_weight, AW.last_weight_date
FROM Animal AS AW;

CREATE OR REPLACE VIEW Animal_trait AS
SELECT AT.session_id, AT.trait_code, AT.when_measured, AT.animal_id
FROM SessionAnimalTrait AS AT;

CREATE OR REPLACE VIEW PICK AS
SELECT P.picklistvalue_id, P.picklist_id, P.value
FROM PicklistValue AS P;

CREATE OR REPLACE VIEW Animal_Activity AS
SELECT AV.session_id, AV.activity_code, AV.when_measured, AV.animal_id
FROM SessionAnimalActivity AS AV;

CREATE OR REPLACE VIEW Animal_Note AS
SELECT AN.created, AN.note, AN.animal_id
FROM Note AS AN;

CREATE OR REPLACE VIEW FirstYearMoms as
select
AF.animal_id,
EXTRACT(Year from AF.dob),
AF.dam,
AF.dam_date
from Animal_facts as AF
where AF.dam IS NOT NULL
   and AF.sex = 'Female'
   AND EXTRACT(Year from CURRENT_DATE) - EXTRACT(year from AF.dob) = 1;


CREATE OR REPLACE VIEW OlderMoms as
select AF.animal_id,
EXTRACT(Year from AF.dob) as Olderdams,
AF.dam,
AF.dam_date
from Animal_facts as AF
where
   AF.dam IS NOT NULL
   AND AF.dam !=''
   AND AF.sex = 'Female'
   AND EXTRACT(Year from CURRENT_DATE) - EXTRACT(year from AF.dob) >1;