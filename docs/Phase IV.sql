CREATE VIEW Animal_facts AS
SELECT AF.animal_id, AF.tag, AF.rfid, AF.DOB, AF.sex
FROM Animal AS AF;

CREATE VIEW Animal_weight AS
SELECT AW.animal_id, AW.last_weight, AW.last_weight_date
FROM Animal AS AW;

CREATE VIEW Animal_trait AS
SELECT AT.session_id, AT.trait_code, AT.when_measured, AT.animal_id
FROM SessionAnimalTraits AS AT;

CREATE VIEW PICK AS
SELECT P.picklistvalue_id, P.picklist, P.value
FROM PicklistValue AS P;

CREATE VIEW Animal_Activity AS
SELECT AV.session_id, AV.activity_code, AV.when_measured, AV.animal_id
FROM SessionAnimalActivity AS AV;

CREATE VIEW Animal_Note AS
SELECT AN.created, AN.note, AN.animal_id
FROM Note AS AN;
