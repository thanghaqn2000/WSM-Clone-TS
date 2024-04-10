-- CreateIndex
CREATE INDEX "time_sheet_user_id_index" ON "TimeSheet"("userId");

-- CreateIndex
CREATE INDEX "time_sheet_woking_date_index" ON "TimeSheet"("workDate");

-- CreateIndex
CREATE INDEX "time_sheet_working_date_user_id_index" ON "TimeSheet"("userId", "workDate");
