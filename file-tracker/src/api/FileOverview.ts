export default interface FileOverview{
    file_info_id: string,
    title: string,
    file_path: string,
    file_description: string | null,
    category_id: string,
    category_name: string,
    icon_url: string
}