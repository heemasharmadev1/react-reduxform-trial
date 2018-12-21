Connect-PnPOnline -Url "https://sharmadev1.sharepoint.com/sites/TrainingTeamSiteDemo"

Write-Host "Starting the setup....."

$fieldAndCTGroup = "SPFx Columns"

Write-Host "Creating fields....."

Add-PnPField -DisplayName TrainingDate -InternalName TrainingDate -Type DateTime -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName TrainingStatus -InternalName TrainingStatus -Type Choice -Choices "In Progess","Approved","Rejected" -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue
Add-PnPField -DisplayName TrainingApprover -InternalName TrainingApprover -Type User -Group  $fieldAndCTGroup -ErrorAction SilentlyContinue

Write-Host "Creating content types....."

Add-PnPContentType -Name 'Training' -Group $fieldAndCTGroup -ErrorAction SilentlyContinue
$TrainingCT = Get-PnPContentType -Identity 'Training'


Write-Host "Adding fields to content type....."

# Add columns to purchase request CT
Add-PnPFieldToContentType -Field TrainingDate -ContentType $TrainingCT
Add-PnPFieldToContentType -Field TrainingStatus -ContentType $TrainingCT
Add-PnPFieldToContentType -Field TrainingApprover -ContentType $TrainingCT
Add-PnPFieldToContentType -Field Title -ContentType $TrainingCT

Write-Host "Creating lists....."

New-PnPList -Title 'Training List1' -Template GenericList -Url Lists/TrainingList1 -ErrorAction SilentlyContinue
$TrainingList1List = Get-PnPList -Identity Lists/TrainingList1
Set-PnPList -Identity 'Training List1' -EnableContentTypes $true
Add-PnPContentTypeToList -List $TrainingList1List -ContentType $TrainingCT -DefaultContentType

Write-Host "Setting up list views....."

Add-PnPView -List $TrainingList1List -Title TrainingList -SetAsDefault -Fields Title,TrainingDate,TrainingStatus

Write-Host "Setup completed....."