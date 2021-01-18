import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  postal_code: string;

  @Column()
  number: string;

  @Column()
  lng: string;

  @Column()
  lat: string;
}

export default Address;
