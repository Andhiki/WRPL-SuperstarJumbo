import OurWarehouse from '@/modules/our-warehouse/our-warehouse'

const warehouseLocation = {
  name: 'Renjana Furnitre',
  desc: 'Visit our warehouse, and make your ideal sanctuary come through.',
  coordinates: [-7.7705088, 110.3787533] as [number, number],
  phone: '08XXXXXXXXX',
  workingDays: 'Monday - Friday',
  workingHours: '07.00 - 22.00',
}

export default function Page() {
  return <OurWarehouse location={warehouseLocation} />
}
