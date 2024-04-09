WITH cte AS (--cte aka common table expression
  SELECT--using it for conditional operations on last weight as when i wanted to use avg and median special commands,
  --i needed to add casting
  -- so this makes it easier to perform average and median
      AF.animal_id,
      CASE
          WHEN AW.last_weight ~ '[0-9]' THEN CAST(AW.last_weight AS decimal) -- cast to numeric field
      END AS num,
      CASE
          WHEN AW.last_weight ~ '[a-zA-Z]' THEN AW.last_weight
      END AS a
  FROM
      Animal_Facts AS AF
  JOIN
      Animal_weight AS AW ON AF.animal_id = AW.animal_id
)
SELECT
  AF.dob,
  AVG(num) AS "Average_weight",
  percentile_cont(0.5) WITHIN GROUP (ORDER BY num) AS "Median_weight"
FROM
  Animal_Facts AS AF
JOIN
  cte ON AF.animal_id = cte.animal_id
GROUP BY
  AF.dob;
