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

CREATE OR REPLACE VIEW Female_goats_dam as
SELECT
   AF.animal_id,
   EXTRACT(YEAR FROM dob) AS birth_year,
   EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM dob) AS current_year
FROM
   Animal_facts AS AF
WHERE
   AF.dam IS NOT NULL
   AND AF.dam !=''
   AND AF.sex = 'Female';

CREATE OR REPLACE VIEW WORKINGTWINS AS
select animal_id, tag, dob, dam
from Animal_facts as AF
where AF.dob IN
(
   select dob
   from Animal_facts
   group by dob
   having COUNT(*) = 2
)
AND AF.dam!=''
order by AF.dam;


CREATE OR REPLACE VIEW CLOSETOTWINS AS
select *
from WORKINGTWINS as WT 
where WT.dam in(
   select dam
   from WORKINGTWINS
   group by dam
   having COUNT(*)>1
)
AND WT.dam !='' 
order by WT.dam;

CREATE OR REPLACE VIEW ACTUALTWINS AS
select *
from CLOSETOTWINS AS CT
where CT.dob IN(
   select dob
   from CLOSETOTWINS
   group by dob
   having COUNT(*)=2
)AND CT.dam !=''
AND CT.dam != 'WAST02'
AND CT.dam !='WAST03'
AND CT.dam!='ORST02'
order by CT.dam;

CREATE OR REPLACE VIEW STARTTRIPLETS as 
select animal_id, tag,dob,dam
from Animal_facts as AF
where AF.dob IN(
   select dob
   from Animal_facts
   group by dob
   having COUNT(*)=3
)
and AF.dam!=''
order by AF.dam;

CREATE OR REPLACE VIEW CLOSETOTRIPLETS AS
select *
from STARTTRIPLETS AS ST
where ST.dam in(
   select dam
   from STARTTRIPLETS
   group by dam
   having COUNT(*)>2
) and ST.dam !=''
order by ST.dam;

CREATE OR REPLACE VIEW ACTUALTRIPLETS AS
select *
from CLOSETOTRIPLETS AS CT
where CT.dob IN(
   select dob
   from CLOSETOTRIPLETS
   group by dob
   having COUNT(*)=3
)and CT.dam !=''
order by CT.dam;

CREATE OR REPLACE VIEW ACTUALSINGLES AS
select AF.animal_id, AF.tag, AF.dam, AF.dob
from Animal_facts as AF
where AF.dob IN(
   select dob
   from Animal_facts
   group by dob
   having count(*)=1
) and AF.dam!=''
order by AF.dam;